export const settings = $state({
  language: 'en' as 'en' | 'zh',
  volume: 1.0,
  reducedMotion: false
})

export function toggleLanguage() {
  settings.language = settings.language === 'en' ? 'zh' : 'en'
}
