$(document).ready(function() {

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/xml/quotes',
        type: 'GET',
        dataType: 'xml',
        data: {
            action: 'query',
            list: 'search',
            format: 'xml',
        },
        beforeSend: function() {
            $('#quotes-loader').show();
        },
        success: function(xml) {
            $('#quotes-loader').hide();
            $.each($(xml).find('quote'), function(i, el) {
                let $html = (`
                <div class='carousel-item carousel-item-content ${i === 0 ? 'active' : ''}'>
                    <div class="row">
                        <div class="col-sm-3 text-center">
                            <img class="rounded-circle" src=${$(this).find('pic_url').text()} class="d-block w-100" alt="random person image">
                        </div>
                        <div class="col-sm-8 ml-3 d-flex flex-column">
                            <div>&lt;&lt; ${$(this).find('text').text()} &gt;&gt;</div>
                            <div class="font-weight-bold mt-3">${$(this).find('name').text()}</div>
                            <div>${$(this).find('title').text()}</div>
                        </div>
                    </div>
                </div>`);
                $("#quotes-carousel-inner").append($html);
            });
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/xml/popular-tutorials',
        type: 'GET',
        dataType: 'xml',
        data: {
            action: 'query',
            list: 'search',
            format: 'xml',
        },
        beforeSend: function() {
            $('#tutorials-loader').show();
        },
        success: function(xml) {
            $('#tutorials-loader').hide();
            $.each($(xml).find('video'), function(i, el) {
                let stars = [];
                for (let j = 0; j < $(this).attr('star'); j++) {
                    stars.push(`
                    <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                    `)
                }
                for (let j = $(this).attr('star'); j < 5; j++) {
                    stars.push(`
                    <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                    `)
                }
                let $html = (`
                <div class="text-center col-12 col-sm-6 col-md-3">
                    <div class="carousel-item active">
                        <div class='tutorial-video-top'>
                            <img class="w-100" src=${$(this).find('thumb_url').text()} alt="smile image">
                            <img src="./images/play.png" class="video-play-img" alt="video play button">
                        </div>
                        <div class="mx-1">
                            <div class="font-weight-bold text-dark text-left mt-3">
                                ${$(this).find('title').text()}
                            </div>
                            <div class="text-secondary text-left mt-3 mb-3">
                                ${$(this).find('sub-title').text()}
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <img src=${$(this).find('author_pic_url').text()} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                <div class="purple-text font-weight-bold">${$(this).find('author').text()}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex pt-1">
                                ${stars.map(star => star)}
                                </div>
                                <div class="purple-text font-weight-bold">
                                    ${$(this).find('duration').text()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("#tutorial-cards-container").append($html);
            });
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/xml/latest-videos',
        type: 'GET',
        dataType: 'xml',
        data: {
            action: 'query',
            list: 'search',
            format: 'xml',
        },
        beforeSend: function() {
            $('#latest-videos-loader').show();
        },
        success: function(xml) {
            $('#latest-videos-loader').hide();

            $.each($(xml).find('video'), function(i, el) {
                let stars = [];
                for (let j = 0; j < $(this).attr('star'); j++) {
                    stars.push(`
                    <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                    `)
                }
                for (let j = $(this).attr('star'); j < 5; j++) {
                    stars.push(`
                    <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                    `)
                }
                let $html = (`
                <div class="text-center col-12 col-sm-6 col-md-3">
                    <div class="carousel-item active">
                        <div class='tutorial-video-top'>
                            <img class="w-100" src=${$(this).find('thumb_url').text()} alt="smile image">
                            <img src="./images/play.png" class="video-play-img" alt="video play button">
                        </div>
                        <div class="mx-1">
                            <div class="font-weight-bold text-dark text-left mt-3">
                                ${$(this).find('title').text()}
                            </div>
                            <div class="text-secondary text-left mt-3 mb-3">
                                ${$(this).find('sub-title').text()}
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <img src=${$(this).find('author_pic_url').text()} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                <div class="purple-text font-weight-bold">${$(this).find('author').text()}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex pt-1">
                                ${stars.map(star => star)}
                                </div>
                                <div class="purple-text font-weight-bold">
                                    ${$(this).find('duration').text()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("#latest-videos-cards-container").append($html);
            });
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
            url: 'https://smileschool-api.hbtn.info/xml/courses',
            type: 'GET',
            dataType: 'xml',
            data: {
                action: 'query',
                list: 'search',
                format: 'xml',
                q: $search_val,
                topic: $all_search,
                sort: $sort_val,
            },
            success: function(xml) {
                // $.each($(xml).find('video'), function(i, el) {
                $.each($(xml).find('topics').find('topic'), function(i, el) {
                    let topicName = $(this).text()[0].toUpperCase() + $(this).text().substring(1);
                    let $btn = $(`<button data-value=${$(this).text()} class="dropdown-item" type="button">${topicName}</button>`);
                    $btn.click(function(e) {
                        $all_search = e.target.getAttribute('data-value');
                        $('#topic-menu-container').text(e.target.textContent);
                        getCourses($search_val, $all_search, $sort_val);
                    });
                    $('#topic-menu').append($btn);
                });

                // for (let i = 0; i < sorts.length; i++) {
                $.each($(xml).find('sorts').find('sort'), function(i, el) {
                    let sortName = $(this).text()[0].toUpperCase() + $(this).text().substr(1,3) + ' ' + $(this).text().substr(5, 1).toUpperCase() + $(this).text().substr(6);
                    let $btn = $(`<button data-value=${$(this).text()} class="dropdown-item" type="button">${sortName}</button>`);
                    $btn.click(function(e) {
                        $sort_val = e.target.getAttribute('data-value');
                        $('#sorting-menu-container').text(e.target.textContent);
                        getCourses($search_val, $all_search, $sort_val);
                    });
                    $('#sorting-menu').append($btn);
                });
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
            url: 'https://smileschool-api.hbtn.info/xml/courses',
            type: 'GET',
            dataType: 'xml',
            data: {
                action: 'query',
                list: 'search',
                format: 'xml',
                q: $search_val,
                topic: $all_search,
                sort: $sort_val,
            },
            beforeSend: function() {
                $('#courses-loader').show();
            },
            success: function(xml) {
                $('#courses-loader').hide();
                let coursesSum = $(xml).find('courses').find('course').length;
                $('#courses-result-number').text(`${coursesSum == 1 ? '1 video': coursesSum + ' videos'}`);
                $("#courses-result-container").empty();

                $.each($(xml).find('courses').find('course'), function(i, el) {
                    let stars = [];
                    for (let j = 0; j < $(this).attr('star'); j++) {
                        stars.push(`
                        <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                        `)
                    }
                    for (let j = $(this).attr('star'); j < 5; j++) {
                        stars.push(`
                        <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                        `)
                    }
                    let $html = (`
                    <div class="text-center col-12 col-sm-4 col-md-3 mb-5">
                        <div class="carousel-item active">
                            <img class="w-100" src=${$(this).find('thumb_url').text()} alt="smile image">
                            <div class="mx-2">
                                <div class="font-weight-bold text-dark text-left mt-3">
                                    ${$(this).find('title').text()}
                                </div>
                                <div class="text-secondary text-left mt-3 mb-3">
                                    ${$(this).find('sub-title').text()}
                                </div>
                                <div class="d-flex align-items-center mb-3">
                                    <img src=${$(this).find('author_pic_url').text()} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                    <div class="purple-text font-weight-bold">${$(this).find('author').text()}</div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex pt-1">
                                        ${stars.map(star => star)}
                                    </div>
                                    <div class="purple-text font-weight-bold">
                                        ${$(this).find('duration').text()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                    $("#courses-result-container").append($html);
                });

            },
            error: function(xhr, status) {
                console.log(`An error occured`);
            }
        });
    }

});
