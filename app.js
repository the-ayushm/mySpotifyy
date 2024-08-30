
let songIndex = 0;
let mainPlay = document.getElementById("mainPlay");
let audioElement = new Audio("./audios/AUDIO1.weba");
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let musicbox = document.querySelectorAll(".musicbox");
let img = document.querySelector(".img img");
let h2 = document.querySelector(".img h2");
let bottomSongName = document.getElementById('bottomSongName')
let bigSongName = document.getElementById('bigSongName')
let bigSongImage = document.getElementById('bigSongImage')


let songs = [
    { songName: "Hanuman Chalisa", filepath: "./audios/AUDIO1.weba", bigMusicImage: "./IMAGES/musicIMAGE1.jpeg" },
    { songName: "Achyutam Keshavam Krishn Damodaram......", filepath: "./audios/AUDIO2.mp3", bigMusicImage: "./IMAGES/musicIMAGE2.jpeg" },
    { songName: "Shri Krishn Govind Hare Murari......", filepath: "./audios/AUDIO3.mp3", bigMusicImage: "./IMAGES/musicIMAGE3.jpeg" },
    { songName: "Shri Krishna Govind Hare Murari....", filepath: "./audios/AUDIO4.mp3", bigMusicImage: "./IMAGES/musicIMAGE3.jpeg" },
    { songName: "O Palan Hareeee........", filepath: "./audios/AUDIO5.mp3", bigMusicImage: "./IMAGES/musicIMAGE5.jpeg" },
    { songName: "O ri chiraiyaaaa........", filepath: "./audios/AUDIO6.mp3", bigMusicImage: "./IMAGES/musicIMAGE6.jpeg" },
    { songName: "Ki Jo Keshri ke lal........", filepath: "./audios/AUDIO7.mp3", bigMusicImage: "./IMAGES/musicIMAGE7.jpeg" },
    { songName: "Mere Ghar Ram Aaye Hai......", filepath: "./audios/AUDIO10.mp3", bigMusicImage: "./IMAGES/musicIMAGE10.jpeg" },
    { songName: "Ram Aayegeee.......", filepath: "./audios/AUDIO9.mp3", bigMusicImage: "./IMAGES/musicIMAGE9.jpeg" },
    { songName: "Aasman ko chukar dekha......", filepath: "./audios/AUDIO8.mp3", bigMusicImage: "./IMAGES/musicIMAGE8.jpg" },
];

const updateSongInfo = () => {
    bottomSongName.innerText = songs[songIndex].songName;
    bigSongName.innerText = songs[songIndex].songName;
    bigSongImage.src = songs[songIndex].bigMusicImage;
}; 

const makeOtherPauseWhenAnyPlay = () => {
    document.querySelectorAll('.playbutton').forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

musicbox.forEach((box, i) => {
    box.innerHTML = `
    <p>${songs[i].songName}</p>
    <i class="fa-regular fa-2x fa-circle-play playbutton" id="${i}"></i>
    <img src="${songs[i].bigMusicImage}" class="coverImage">`

    

    box.querySelectorAll('.playbutton').forEach((element) => {
        element.addEventListener('click', (e) => {

            if (songIndex !== i) {
                songIndex = i;
                audioElement.src = songs[songIndex].filepath;
            }
            if (audioElement.paused || audioElement.currentTime<=0) {
                makeOtherPauseWhenAnyPlay()
                e.target.classList.remove('fa-circle-play')
                e.target.classList.add('fa-circle-pause')
                audioElement.play()
                mainPlay.classList.remove('fa-play-circle')
                mainPlay.classList.add('fa-pause-circle')
                gif.style.opacity = 1
            }
            else {
                e.target.classList.add('fa-circle-play')
                e.target.classList.remove('fa-circle-pause')
                audioElement.pause()
                mainPlay.classList.remove('fa-pause-circle')
                mainPlay.classList.add('fa-play-circle')
                gif.style.opacity = 0
            }
            updateSongInfo();
            
        });

    });
})
    



    // MAINPLAY----------------------------------------------------------------------------------------------------------------------------
    mainPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        updateSongInfo()
        mainPlay.classList.remove('fa-play-circle')
        mainPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
        makeOtherPauseWhenAnyPlay()
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play')
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause')
    }
    else {
        
            audioElement.pause()
            mainPlay.classList.remove('fa-pause-circle')
            mainPlay.classList.add('fa-play-circle')
            gif.style.opacity = 0
            document.getElementById(`${songIndex}`).classList.add('fa-circle-play')
            document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause')
        
       
    }
})
    // PREVIOUS------------------------------------------------------------------------------------------------------------------------
    document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = songs.length -1
        }
        else {
            songIndex -= 1
        }
        
        audioElement.src = songs[songIndex].filepath
        audioElement.currentTime = 0
        audioElement.play()
        updateSongInfo()
        makeOtherPauseWhenAnyPlay()
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
        gif.style.opacity = 1
        mainPlay.classList.remove('fa-play-circle')
        mainPlay.classList.add('fa-pause-circle')

    })
    // -------------------------------------------------------------------------------------------------------------------------------
    // NEXT-----------------------------------------------------------------------------------------------------------------
    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= songs.length-1) {
            songIndex = 0
        }
        else {
            songIndex += 1
        }

        audioElement.src = songs[songIndex].filepath
        audioElement.currentTime = 0
        audioElement.play()
        updateSongInfo()
        makeOtherPauseWhenAnyPlay()
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
        gif.style.opacity = 1
        mainPlay.classList.remove('fa-play-circle')
        mainPlay.classList.add('fa-pause-circle')

    })
    // ----------------------------------------------------------------------------------------------------------------------------




audioElement.addEventListener("timeupdate", () => {
   const  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})
// --------------------------------------------------------------------------------------------------------------------------------

