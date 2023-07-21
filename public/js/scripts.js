// First of all, let’s check if the browser cuts the mustard
if ('matchMedia' in window
    && 'querySelector' in document
    && !!document.createElement("video").canPlayType)
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
    if (!!document.fullscreenEnabled)
    {
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
                toggleFile = (currentFile, files) =>
                {
                    return files.filter(file => file !== currentFile)[0];
                },
                toggleLabel = (currentLabel, labels) =>
                {
                    return labels.filter(label => label !== currentLabel)[0];
                },
                formatTimer = (time, isMachineReadable = false) =>
                {
                    if (!time) return isMachineReadable ? 'PT0S' : '0:00';
                    const timeDays = Math.floor(time / 86400),
                        timeHours = Math.floor(time / 3600),
                        timeMinutes = Math.floor(time / 60),
                        timeSeconds = isMachineReadable ? time : Math.floor(time),
                        days = isMachineReadable ? timeDays : 0,
                        hours = isMachineReadable ? timeHours % 24 : timeHours,
                        minutes = timeMinutes % 60,
                        seconds = timeSeconds % 60;
                    if (isMachineReadable) value = `P${days}DT${hours}H${minutes}M${seconds}S`.replaceAll(/(?<![1-9]+)[0](D|H|M|S)/g, '');
                    else
                    {
                        const timer = hours ? [hours, minutes.toString(10).padStart(2, '0'), seconds.toString(10).padStart(2, '0')] : [minutes, seconds.toString(10).padStart(2, '0')];
                        value = timer.join(':');
                    }
                    return value;
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
                        labels: ['Lire', 'Mettre en pause'],
                        files: ['/images/play.svg', '/images/pause.svg']
                    },
                    {
                        id: 'muteUnmute',
                        element: 'button',
                        classList: ['mute-unmute', 'mute'],
                        labels: ['Désactiver le son', 'Activer le son'],
                        files: ['/images/mute.svg', '/images/unmute.svg']
                    },
                    {
                        id: 'timer',
                        element: 'span',
                        classList: ['timer']
                    },
                    {
                        id: 'fullscreen',
                        element: 'button',
                        classList: ['fullscreen', 'enter'],
                        labels: ['Afficher en plein écran', 'Quitter le mode plein écran'],
                        files: ['/images/fullscreen-enter.svg', '/images/fullscreen-exit.svg']
                    }
                ];
            video.controls = false;
            player.classList.add('player');
            playerControls.classList.add('controls');
            videoArticle.insertBefore(player, video);
            player.appendChild(video);
            player.appendChild(playerControls);
            for (const control of controls)
            {
                const { id, element, classList, labels, files } = control,
                    li = document.createElement('li'),
                    node = document.createElement(element);
                node.classList.add(...classList);
                if (element === 'button')
                {
                    const img = document.createElement('img');
                    img.src = control.files[0];
                    img.alt = labels[0];
                    img.width = 50;
                    img.height = 50;
                    node.setAttribute('type', 'button');
                    node.appendChild(img);
                    node.addEventListener('click', (e) =>
                    {
                        const elementClasses = node.classList,
                            img = node.querySelector('img'),
                            alt = img.alt;
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
                                        img.src = files[0];
                                        img.alt = labels[0];
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
                                        img.src = files[1];
                                        img.alt = labels[0];
                                        hasNotToggled = false;
                                    }
                                }
                                toggleClass(elementClasses, ['enter', 'exit']);
                                break;
                            default:
                                break;
                        }
                        if (hasNotToggled)
                        {
                            img.src = toggleFile(img.getAttribute('src'), files);
                            img.alt = toggleLabel(alt, labels);
                        }
                    });
                }
                else if (element === 'progress')
                {
                    node.setAttribute('value', '0');
                    node.setAttribute('min', '0');
                }
                else
                {
                    const currentTime = document.createElement('time'),
                        duration = document.createElement('time'),
                        separator = document.createTextNode(' / ');
                    currentTime.classList.add('current-time');
                    currentTime.setAttribute('datetime', 'PT0S');
                    currentTime.textContent = '0:00';
                    duration.classList.add('duration');
                    node.appendChild(currentTime);
                    node.appendChild(separator);
                    node.appendChild(duration);
                }
                li.appendChild(node);
                playerControls.appendChild(li);
            }
            const timer = playerControls.querySelector('.timer'),
                currentTime = timer.querySelector('.current-time'),
                duration = timer.querySelector('.duration'),
                progress = playerControls.querySelector('progress');
            video.addEventListener('loadedmetadata', () =>
            {
                duration.setAttribute('datetime', formatTimer(video.duration, true));
                duration.textContent = formatTimer(video.duration);
                progress.setAttribute('max', video.duration);
            });
            video.addEventListener('timeupdate', () =>
            {
                progress.value = video.currentTime;
                currentTime.setAttribute('datetime', formatTimer(video.currentTime, true));
                currentTime.textContent = formatTimer(video.currentTime);
            });
            video.addEventListener('ended', () =>
            {
                const playPause = playerControls.querySelector('.play-pause'),
                    playPauseClasses = playPause.classList,
                    img = playPause.querySelector('img');
                let alt = img.alt;
                img.src = toggleFile(img.getAttribute('src'), controls.filter(control => control.id === 'playPause')[0].files);
                img.alt = toggleLabel(alt, controls.filter(control => control.id === 'playPause')[0].labels);
                toggleClass(playPauseClasses, ['play', 'pause']);
                progress.value = 0;
                currentTime.setAttribute('datetime', 'PT0S');
                currentTime.textContent = '0:00';
            });
            progress.addEventListener('click', (e) =>
            {
                const position = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
                video.currentTime = position * video.duration;
            });

            // Emulate the toggle changes on the fullscreen button when quitting fullscreen mode by pressing the escape key
            document.addEventListener('fullscreenchange', (e) =>
            {
                const fullscreenControl = playerControls.querySelector('.fullscreen'),
                    img = fullscreenControl.querySelector('img'),
                    alt = img.alt;
                if (document.fullscreenElement === null && fullscreenControl.classList.contains('exit'))
                {
                    toggleClass(fullscreenControl.classList, ['enter', 'exit']);
                    img.src = toggleFile(img.getAttribute('src'), controls.filter(control => control.id === 'fullscreen')[0].files);
                    img.alt = toggleLabel(alt, controls.filter(control => control.id === 'fullscreen')[0].labels);
                }
            });
        }
    }

    const host = document.location.origin;

    // Increment the views of a video
    const video = document.querySelector('.video video');
    if (video)
    {
        let isViewingCounted = false;
        video.addEventListener('playing', () =>
        {
            if (!isViewingCounted)
            {
                const id = document.location.pathname.replace('/videos/', ''),
                    options = { method: 'PUT' };
                fetch(`${host}/api/videos/${id}/increment`, options)
                    .then((response) => response.status);
                isViewingCounted = !isViewingCounted;
            }
        });
        video.addEventListener('ended', () =>
        {
            if (isViewingCounted) isViewingCounted = !isViewingCounted;
        })
    }

    // Upload a video
    const videoUploadForm = document.querySelector('.back-office-form.upload');
    if (videoUploadForm)
    {
        videoUploadForm.addEventListener('submit', (e) =>
        {
            e.preventDefault();

            const data = new FormData(e.target);
            const options =
                {
                    method: 'POST',
                    body: data
                };
            fetch(`${host}/api/videos`, options)
                .then((response) =>
                {
                    if (response.status === 201) document.location.href = `${host}/account/videos`;
                })
                .catch((err) => console.error(err));
        });
    }
}
