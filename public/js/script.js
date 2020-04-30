$(function () {
    var body = $('body'),
        stage = $('#stage'),
        back = $('a.start');

    // ================================== page 1 ================================== //
    $('#page1 .encrypt').on("click", function () {
        body.attr('class', 'encrypt');
        page(2);
    });
    $('#page1 .decrypt').click(function () {
        body.attr('class', 'decrypt');
        page(2);
    });

    // ================================== page 2 ================================== //
    $('#page2 .button').click(function () {
        $(this).parent().find('input').click()
    });

    var file = null;

    $('#page2').on('change', '#encrypt-input', function (in_file) {

        file = in_file.target.files;
        var extension = file[0].name.split('.').pop();

        if (file.length != 1) {
            alert('Please select a file to encrypt!!');
            return false;
        } else if (extension == "mp3" || extension == "wav") {
            alert('The file "' + file[0].name + '" has been selected.');

            var myFormData = new FormData();
            myFormData.append('file', file[0], file[0].name);
            $('form').attr('enctype', 'multipart/form-data')

            var options = {
                method: 'POST',
                body: myFormData
            }

            fetch('/encrypt', options)
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(e => {
                    console.error(e)
                })
                .then(page(3))
            
        } else {
            alert('Please only choose .mp3 or .wav!!');
        }
    });

    $('#page2').on('change', '#decrypt-input', function (in_file) {

        file = in_file.target.files;
        var extension = file[0].name.split('.').pop();

        if (file.length != 1) {
            alert('Please select an audio file to decrypt!!');
            return false;
        } else if (extension != "encrypted") {
            alert('Please only choose .encrypted!!')
        } else {
            alert('The file "' + file[0].name + '" has been selected.');

            var myFormData = new FormData();
            myFormData.append('file', file[0], file[0].name);
            $('form').attr('enctype', 'multipart/form-data')

            var options = {
                method: 'POST',
                body: myFormData
            }

            fetch('/decrypt', options)
                .then(response =>response.text())
                .then(data => console.log(data))
                .catch(e => {
                    console.error(e)
                })
                .then(page(3))
        }
    })

    // ================================== page 3 ================================== //

    $('a.button.process').click(function () {

        if (body.hasClass('encrypt')) {
            var a = $('#download');
            fetch('/getEncrypt')
                .then(res => res.text())
                .then(data => {
                    a.attr('href', 'data:application/octet-stream,' + data)
                    a.attr('download', file[0].name + ".encrypted")
                })
                .then( function() {
                    setTimeout(page(4), 3000)})
                .catch(err => console.error(err))

        } else if (body.hasClass('decrypt')) {
            var audio = $('#audio')
            fetch('/getDecrypt')
                .then(res => res.blob())
                .then(data => {
                    var url = window.URL.createObjectURL(data)
                    audio.attr('src', url)
                    audio.prop('volume', 0.5)
                })
                .then( () => {
                    setTimeout(page(4), 3000)})
                .catch(err => console.error(err))
        }

    });

    back.click(function () {
        $('#page2 input[type=file]').replaceWith(function () {
            return $(this).clone()
        });
        const audio = $('#audio')
        if (body.hasClass('decrypt')) {
            if (!audio.prop('paused') && audio.prop('duration') > 0) {
                audio.get(0).pause();
            }
            window.URL.revokeObjectURL(audio.attr('src'))
        } else if(body.hasClass('encrypt')) {
            var a = $('#download');
            a.attr('href', '')
            a.attr('download', '')
        }
        page(1);
    })

    // ================================== OTHER ================================== //    
    function page(i) {
        if (i == 1) {
            back.fadeOut();
        } else {
            back.fadeIn();
        }
        // move #stage (chaning the top property will trigger a css transition on element)
        // i-1 so the page will start from 1:
        stage.css('top', (-(i - 1) * 100) + '%');
    }
});