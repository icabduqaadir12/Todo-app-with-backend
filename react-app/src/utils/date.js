export const getCurrentDay = () => new Date().toLocaleDateString('en-US', {
    weekday: 'long'
})