$(document).ready(function() {

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
        },
        beforeSend: function() {
            $('#quotes-loader').show();
        },
        success: function(response) {
            $('#quotes-loader').hide();
            for (let i = 0; i < response.length; i++) {
                let $html = (`
                <div class='carousel-item carousel-item-content ${i === 0 ? 'active' : ''}'>
                    <div class="row">
                        <div class="col-sm-3 text-center">
                            <img class="rounded-circle" src=${response[i].pic_url} class="d-block w-100" alt="random person image">
                        </div>
                        <div class="col-sm-8 ml-3 d-flex flex-column">
                            <div>&lt;&lt; ${response[i].text} &gt;&gt;</div>
                            <div class="font-weight-bold mt-3">${response[i].name}</div>
                            <div>${response[i].title}</div>
                        </div>
                    </div>
                </div>`);
                $("#quotes-carousel-inner").append($html);
            }
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
        },
        beforeSend: function() {
            $('#tutorials-loader').show();
        },
        success: function(response) {
            $('#tutorials-loader').hide();
            for (let i = 0; i < response.length; i++) {
                let stars = [];
                for (let j = 0; j < response[i].star; j++) {
                    stars.push(`
                    <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                    `)
                }
                for (let j = response[i].star; j < 5; j++) {
                    stars.push(`
                    <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                    `)
                }
                let $html = (`
                <div class="text-center col-12 col-sm-6 col-md-3">
                    <div class="carousel-item active">
                        <div class='tutorial-video-top'>
                            <img class="w-100" src=${response[i].thumb_url} alt="smile image">
                            <img src="./images/play.png" class="video-play-img" alt="video play button">
                        </div>
                        <div class="mx-1">
                            <div class="font-weight-bold text-dark text-left mt-3">
                                ${response[i].title}
                            </div>
                            <div class="text-secondary text-left mt-3 mb-3">
                                ${response[i]['sub-title']}
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <img src=${response[i].author_pic_url} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                <div class="purple-text font-weight-bold">${response[i].author}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex pt-1">
                                ${stars.map(star => star)}
                                </div>
                                <div class="purple-text font-weight-bold">
                                    ${response[i].duration}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("#tutorial-cards-container").append($html);
            }
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/latest-videos',
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
        },
        beforeSend: function() {
            $('#latest-videos-loader').show();
        },
        success: function(response) {
            $('#latest-videos-loader').hide();
            for (let i = 0; i < response.length; i++) {
                let stars = [];
                for (let j = 0; j < response[i].star; j++) {
                    stars.push(`
                    <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                    `)
                }
                for (let j = response[i].star; j < 5; j++) {
                    stars.push(`
                    <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                    `)
                }
                let $html = (`
                <div class="text-center col-12 col-sm-6 col-md-3">
                    <div class="carousel-item active">
                        <div class='tutorial-video-top'>
                            <img class="w-100" src=${response[i].thumb_url} alt="smile image">
                            <img src="./images/play.png" class="video-play-img" alt="video play button">
                        </div>
                        <div class="mx-1">
                            <div class="font-weight-bold text-dark text-left mt-3">
                                ${response[i].title}
                            </div>
                            <div class="text-secondary text-left mt-3 mb-3">
                                ${response[i]['sub-title']}
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <img src=${response[i].author_pic_url} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                <div class="purple-text font-weight-bold">${response[i].author}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex pt-1">
                                ${stars.map(star => star)}
                                </div>
                                <div class="purple-text font-weight-bold">
                                    ${response[i].duration}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("#latest-videos-cards-container").append($html);
            }
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });

    let $search_val = $('.user_search').val();
    let $all_search = 'all';
    let $sort_val = 'most_popular';

    function coursesHTML() {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'query',
                list: 'search',
                format: 'json',
                q: $search_val,
                topic: $all_search,
                sort: $sort_val,
            },
            success: function(response) {
                let topics = response.topics;
                let sorts = response.sorts;
                for (let i = 0; i < topics.length; i++) {
                    let topicName = topics[i][0].toUpperCase() + topics[i].substring(1);
                    let $btn = $(`<button data-value=${topics[i]} class="dropdown-item" type="button">${topicName}</button>`);
                    $btn.click(function(e) {
                        $all_search = e.target.getAttribute('data-value');
                        $('#topic-menu-container').text(e.target.textContent);
                        getCourses($search_val, $all_search, $sort_val);
                    });
                    $('#topic-menu').append($btn);
                }
                for (let i = 0; i < sorts.length; i++) {
                    let sortName = sorts[i][0].toUpperCase() + sorts[i].substr(1,3) + ' ' + sorts[i].substr(5, 1).toUpperCase() + sorts[i].substr(6);
                    let $btn = $(`<button data-value=${sorts[i]} class="dropdown-item" type="button">${sortName}</button>`);
                    $btn.click(function(e) {
                        $sort_val = e.target.getAttribute('data-value');
                        $('#sorting-menu-container').text(e.target.textContent);
                        getCourses($search_val, $all_search, $sort_val);
                    });
                    $('#sorting-menu').append($btn);
                }
            },
            error: function(xhr, status) {
                console.log(`An error occured`);
            }
        });
    }

    coursesHTML();

    $('#user_search').on('input', function(e) {
        $search_val = e.target.value;
        setTimeout(function() {
            getCourses($search_val, $all_search, $sort_val);
        }, 500);
    });

    
    function getCourses($search_val, $all_search, $sort_val) {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'query',
                list: 'search',
                format: 'json',
                q: $search_val,
                topic: $all_search,
                sort: $sort_val,
            },
            beforeSend: function() {
                $('#courses-loader').show();
            },
            success: function(response) {
                let courses = response.courses;
                $('#courses-loader').hide();
                $('#courses-result-number').text(`${courses.length == 1 ? '1 video': courses.length + ' videos'}`);
                $("#courses-result-container").empty();
                for (let i = 0; i < courses.length; i++) {
                    let course = courses[i];
                    let stars = [];
                    for (let j = 0; j < course.star; j++) {
                        stars.push(`
                        <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                        `)
                    }
                    for (let j = course.star; j < 5; j++) {
                        stars.push(`
                        <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                        `)
                    }
                    let $html = (`
                    <div class="text-center col-12 col-sm-4 col-md-3 mb-5">
                        <div class="carousel-item active">
                            <img class="w-100" src=${course.thumb_url} alt="smile image">
                            <div class="mx-2">
                                <div class="font-weight-bold text-dark text-left mt-3">
                                    ${course.title}
                                </div>
                                <div class="text-secondary text-left mt-3 mb-3">
                                    ${course['sub-title']}
                                </div>
                                <div class="d-flex align-items-center mb-3">
                                    <img src=${course.author_pic_url} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                    <div class="purple-text font-weight-bold">${course.author}</div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex pt-1">
                                        ${stars.map(star => star)}
                                    </div>
                                    <div class="purple-text font-weight-bold">
                                        ${course.duration}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                    $("#courses-result-container").append($html);
                }
            },
            error: function(xhr, status) {
                console.log(`An error occured`);
            }
        });
    }

});
