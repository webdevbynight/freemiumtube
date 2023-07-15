// First of all, let’s check if the browser cuts the mustard
if ('matchMedia' in window
    && 'querySelector' in document
    && !!document.createElement("video").canPlayType
    && !!document.fullscreenEnabled)
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

    // Build the custom video player
    const videoArticle = document.querySelector('.video');
    if (videoArticle)
    {
        const video = videoArticle.querySelector('video'),
            player = document.createElement('div'),
            playerControls = document.createElement('ul'),
            toggleClass = (element, classes) =>
            {
                for (const className of classes)
                {
                    element.toggle(className);
                }
            },
            toggleLabel = (currentLabel, labels) =>
            {
                return labels.filter(label => label !== currentLabel)[0];
            },
            controls =
            [
                {
                    id: 'progress',
                    element: 'progress',
                    classList: ['progress']
                },
                {
                    id: 'playPause',
                    element: 'button',
                    classList: ['play-pause', 'play'],
                    labels: ['Lire', 'Mettre en pause']
                },
                {
                    id: 'muteUnmute',
                    element: 'button',
                    classList: ['mute-unmute', 'mute'],
                    labels: ['Désactiver le son', 'Activer le son']
                },
                {
                    id: 'fullscreen',
                    element: 'button',
                    classList: ['fullscreen', 'enter'],
                    labels: ['Afficher en plein écran', 'Quitter le mode plein écran']
                }
                // TODO: add timer
            ];
        video.controls = false;
        player.classList.add('player');
        playerControls.classList.add('controls');
        videoArticle.insertBefore(player, video);
        player.appendChild(video);
        player.appendChild(playerControls);
        for (const control of controls)
        {
            const { id, element, classList, labels } = control,
                li = document.createElement('li'),
                node = document.createElement(element);
            node.classList.add(...classList);
            if (element === 'button')
            {
                node.setAttribute('type', 'button');
                node.textContent = labels[0];
                node.addEventListener('click', (e) =>
                {
                    const elementClasses = e.target.classList,
                        text = e.target.textContent;
                    let hasNotToggled = true;
                    switch (id)
                    {
                        case 'playPause':
                            if (video.paused || video.ended) video.play();
                            else video.pause();
                            toggleClass(elementClasses, ['play', 'pause']);
                            break;
                        case 'muteUnmute':
                            const isMute = video.muted;
                            video.muted = !isMute;
                            toggleClass(elementClasses, ['mute', 'unmute']);
                            break;
                        case 'fullscreen':
                            if (document.fullscreenElement !== null)
                            {
                                if ('exitFullscreen' in document) document.exitFullscreen();
                                
                                // Safari iPad OS 16.5-
                                else if ('webkitExitFullscreen', 'webkitExitFullscreen' in document)
                                {
                                    document.webkitExitFullscreen();
                                    e.target.textContent = toggleLabel(text, labels);
                                    hasNotToggled = false;
                                }
                            }
                            else
                            {
                                if ('requestFullscreen', 'requestFullscreen' in player) player.requestFullscreen();
                                
                                // Safari iPad OS 16.5-
                                else if ('webkitRequestFullscreen', 'webkitRequestFullscreen' in player)
                                {
                                    player.webkitRequestFullscreen();
                                    e.target.textContent = toggleLabel(text, labels);
                                    hasNotToggled = false;
                                }
                            }
                            toggleClass(elementClasses, ['enter', 'exit']);
                            break;
                        default:
                            break;
                    }
                    if (hasNotToggled) e.target.textContent = toggleLabel(text, labels);
                });
            }
            else
            {
                node.setAttribute('value', '0');
                node.setAttribute('min', '0');
            }
            li.appendChild(node);
            playerControls.appendChild(li);
        }
        const progress = playerControls.querySelector('progress');
        video.addEventListener('loadedmetadata', () =>
        {
            progress.setAttribute('max', video.duration);
        });
        video.addEventListener('timeupdate', () =>
        {
            progress.value = video.currentTime;
        });
        video.addEventListener('ended', () =>
        {
            const playPause = playerControls.querySelector('.play-pause'),
                playPauseClasses = playPause.classList;
            let text = playPause.textContent;
            text = toggleLabel(text, controls.filter(control => control.id === 'playPause')[0].labels);
            toggleClass(playPauseClasses, ['play', 'pause']);
            progress.value = 0;
        });
        progress.addEventListener('click', (e) =>
        {
            const position = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
            video.currentTime = position * video.duration;
        });

        // Emulate the toggle changes on the fullscreen button when quitting fullscreen mode by pressing the escape key
        document.addEventListener('fullscreenchange', (e) =>
        {
            const fullscreenControl = playerControls.querySelector('.fullscreen');
            if (document.fullscreenElement === null && fullscreenControl.classList.contains('exit'))
            {
                toggleClass(fullscreenControl.classList, ['enter', 'exit']);
                fullscreenControl.textContent = toggleLabel(fullscreenControl.textContent, controls.filter(control => control.id === 'fullscreen')[0].labels);
            }
        });
    }
}