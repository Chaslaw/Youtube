var key = "AIzaSyAl0UJFp10Xc_xTptqWrE-a7SNr1wJa43M";

var searchButton = document.querySelector('.search-box button');
var videoList = document.querySelector('.video-list');
var videoPreview = document.querySelector('.video-preview');

var loader = document.querySelector('main div');
loader.className = "loader";

function onSearch () {
    
    var searchField = document.querySelector('.search-box input');

    searchField.value.trim() && getVideos(searchField.value);
    searchField.value = '';
}

function getVideos (searchValue) {

    var req = new XMLHttpRequest;

    req.open('GET', "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="+ searchValue +"&key=" + key);

    req.onload = function () {
        listVideos(JSON.parse(req.responseText).items);
    }

    req.send();

    loader.classList.remove('loader')
}

function relatedVideos(theId) {
	var request = new XMLHttpRequest();

    request.open("GET", 'https://www.googleapis.com/youtube/v3/search?part=snippet&\maxResults=5&type=video&relatedToVideoId=' + theId +'&key=' + key);
    
    request.onload = function(){
		listVideos(JSON.parse(request.responseText).items);
	}

	request.send();
}

function listVideos (videos) {

videoList.innerHTML = "";

  videos.forEach(function(video) {
        addVideo(video);
    });
    
    loader.classList.add("loader");
}

function addVideo (videoData) {

    var videoElement = document.createElement('div');
    
    var img = '<img src="'+ videoData.snippet.thumbnails.medium.url +'"/>';
    var title = '<h3>'+ videoData.snippet.title +'</h3>';
    var desc = '<div>'+ videoData.snippet.description +'</div>';
    
    videoElement.innerHTML = img + '<section>' + title + desc + '</section>';
   
    videoList.appendChild(videoElement);
    
    videoElement.querySelectorAll('h3, img').forEach(function(element){
        element.addEventListener('click', function(){
            openVideo(videoData.id.videoId);
            relatedVideos(videoData.id.videoId);

        });
    });

}

function openVideo (id) {

    videoPreview.innerHTML = '<iframe width="760" height="515" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

    videoPreview.classList.add('video-preview-new');
};

searchButton.addEventListener('click', onSearch);
