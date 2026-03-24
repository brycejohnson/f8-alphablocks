<script lang="ts">
  import { untrack } from 'svelte'
  import { game, startWord, resetWord } from '$lib/stores/game.svelte'
  import { settings } from '$lib/stores/settings.svelte'
  import { preloadPhonemes } from '$lib/audio/phonemePlayer'
  import { base } from '$app/paths'
  import WordStage from './WordStage.svelte'
  import PhaseSelect from './PhaseSelect.svelte'
  import RevealGame from './games/RevealGame.svelte'
  import ListenMatchGame from './games/ListenMatchGame.svelte'
  import RecallGame from './games/RecallGame.svelte'
  import PictureMatchGame from './games/PictureMatchGame.svelte'
  import CompoundGame from './games/CompoundGame.svelte'
  import { enCurriculum } from '$lib/data/curriculum/en'
  import { zhCurriculum } from '$lib/data/curriculum/zh'
  import { selectWords, isPhaseComplete, nextPhase } from '$lib/engine/wordSelector'
  import { progress, advancePhase } from '$lib/stores/progress.svelte'
  import type { CurriculumWord } from '$lib/data/curriculum/types'

  let wordQueue: CurriculumWord[] = $state([])
  let queueIndex = $state(0)
  let loading = $state(false)
  let advanceTimer = 0

  // Tell the SW to prefetch upcoming audio before it's needed
  function speculativePrefetch(lang: 'en' | 'zh', words: CurriculumWord[]) {
    if (typeof navigator === 'undefined' || !navigator.serviceWorker?.controller) return
    const urls: string[] = []
    for (const word of words) {
      for (const id of word.phonemeIds) urls.push(`${base}/audio/${lang}/${id}.m4a`)
      urls.push(`${base}/audio/${lang}/${word.id}.m4a`)
    }
    navigator.serviceWorker.controller.postMessage({ type: 'PREFETCH', urls })
  }

  // For English mode: re-init when language switches
  $effect(() => {
    const lang = settings.language
    if (lang === 'en') {
      untrack(() => initEnglishLevel(lang))
    }
  })

  // When a Chinese phase is selected, init that phase's words
  $effect(() => {
    if (game.screen === 'playing' && settings.language === 'zh' && game.zhGameMode) {
      untrack(() => initChinesePhase())
    }
  })

  async function initEnglishLevel(lang: 'en' | 'zh') {
    loading = true
    resetWord()
    game.screen = 'playing'

    const curriculum = enCurriculum
    const currentPhase = progress.unlockedPhase[lang] ?? 1
    wordQueue = selectWords(curriculum, currentPhase, progress.completedWords, 5)
    queueIndex = 0

    loading = false
    game.language = lang
    startWord(wordQueue[0])

    const allIds = new Set<string>()
    for (const word of wordQueue) {
      for (const id of word.phonemeIds) allIds.add(id)
      allIds.add(word.id)
    }
    preloadPhonemes(lang, [...allIds])
    speculativePrefetch(lang, wordQueue)
  }

  async function initChinesePhase() {
    loading = true
    resetWord()

    const phase = zhCurriculum.find(p => p.phase === game.activePhase)
    if (!phase) { loading = false; return }

    wordQueue = [...phase.words].sort(() => Math.random() - 0.5)
    queueIndex = 0

    loading = false
    game.language = 'zh'
    startWord(wordQueue[0])

    // Preload all audio for this phase
    const allIds = new Set<string>()
    for (const word of wordQueue) {
      for (const id of word.phonemeIds) allIds.add(id)
      allIds.add(word.id)
    }
    preloadPhonemes('zh', [...allIds])
    speculativePrefetch('zh', wordQueue)
  }

  function advanceWord() {
    const lang = settings.language

    if (lang === 'en') {
      const curriculum = enCurriculum
      const currentPhase = progress.unlockedPhase[lang] ?? 1
      if (isPhaseComplete(curriculum, currentPhase, progress.phonemeTaps)) {
        const next = nextPhase(curriculum, currentPhase)
        if (next !== null) {
          advancePhase(lang)
          initEnglishLevel(lang)
          return
        }
      }
    }

    queueIndex++
    if (queueIndex >= wordQueue.length) {
      // For Chinese: reshuffle and continue
      if (lang === 'zh') {
        const phase = zhCurriculum.find(p => p.phase === game.activePhase)
        if (phase) {
          wordQueue = [...phase.words].sort(() => Math.random() - 0.5)
          queueIndex = 0
          speculativePrefetch('zh', wordQueue)
        }
      } else {
        const curriculum = enCurriculum
        const currentPhase = progress.unlockedPhase[lang] ?? 1
        wordQueue = selectWords(curriculum, currentPhase, progress.completedWords, 5)
        queueIndex = 0
        speculativePrefetch(lang, wordQueue)
      }
    }
    startWord(wordQueue[queueIndex])
  }

  // Listen for resetWord signal (after celebration) to advance
  $effect(() => {
    if (!game.activeWord && !loading && wordQueue.length > 0 && game.screen === 'playing') {
      clearTimeout(advanceTimer)
      advanceTimer = setTimeout(advanceWord, 400)
    }
  })
</script>

<div class="canvas-wrap">
  {#if loading}
    <div class="loader">
      <div class="spinner"></div>
      <p>Loading sounds…</p>
    </div>
  {:else if settings.language === 'zh' && game.screen === 'phase-select'}
    <PhaseSelect />
  {:else if settings.language === 'zh' && game.zhGameMode === 'reveal'}
    <RevealGame />
  {:else if settings.language === 'zh' && game.zhGameMode === 'listen-match'}
    <ListenMatchGame />
  {:else if settings.language === 'zh' && game.zhGameMode === 'recall'}
    <RecallGame />
  {:else if settings.language === 'zh' && game.zhGameMode === 'picture-match'}
    <PictureMatchGame />
  {:else if settings.language === 'zh' && game.zhGameMode === 'compound'}
    <CompoundGame />
  {:else}
    <WordStage />
  {/if}
</div>

<style>
  .canvas-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  }

  .loader {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: rgba(255,255,255,0.7);
    font-size: 1.1rem;
    font-weight: 600;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 5px solid rgba(255,255,255,0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
