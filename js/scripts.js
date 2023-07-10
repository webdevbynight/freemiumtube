// First of all, let’s check if the browser cuts the mustard
if ('matchMedia' in window && 'querySelector' in document)
{
    // Show / hide the list of available languages
    const switchLanguages = document.getElementById('switch-languages'),
        switchLanguagesButton = switchLanguages.querySelector('button'),
        switchLanguagesLinks = switchLanguages.querySelectorAll('a'),
        classToToggle = 'select-lang';
    switchLanguagesButton.addEventListener('click', (e) =>
    {
        e.preventDefault();
        e.target.classList.toggle(classToToggle);
    });
    for (const link of switchLanguagesLinks)
    {
        link.addEventListener('click', (e) =>
        {
            e.preventDefault();
            switchLanguagesButton.classList.toggle(classToToggle);
        });
    }
}