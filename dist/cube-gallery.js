'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubeGallery = function () {
    function CubeGallery(id, _ref) {
        var _this = this;

        var minHeight = _ref.minHeight,
            margin = _ref.margin;

        _classCallCheck(this, CubeGallery);

        // selector
        this.id = id;
        // min height
        this.minHeight = minHeight && minHeight > 0 ? minHeight : 150;
        // unit
        this.unit = 'px';
        // margin
        this.margin = margin && margin > 0 ? margin : 0;

        // gallery container
        this.gallery = document.querySelector('#' + this.id);
        this.gallery.style.fontSize = '0'; // remove white spaces
        this.gallery.style.lineHeight = '0'; // remove white spaces

        // extra borders or padding or margins that can be added with css
        this.extra = 0;

        // img wrapper <a>
        var wrapper = document.querySelectorAll('#' + this.id + ' a');
        if (wrapper.length > 0) {
            this.findExtraWidth(wrapper[0]);
            wrapper.forEach(function (a) {
                a.style.display = 'inline-block';
                a.style.position = 'relative';
            });
        }

        var imgs = document.querySelectorAll('#' + this.id + ' img');
        this.findExtraWidth(imgs[0]);

        window.addEventListener('resize', function () {
            _this.resize();
        });

        // wait for all images loaded
        var loadData = function loadData() {
            return _this.loadData();
        };
        var create = function create() {
            return _this.create();
        };
        var counter = 0;

        imgs.forEach.call(imgs, function (img) {
            if (img.complete) {
                counter++;
                if (counter === imgs.length) {
                    console.log('All images loaded!');
                    loadData(); // load varible datas
                    create(); // build gallery
                }
            } else {
                img.addEventListener('load', function () {
                    counter++;
                    if (counter === imgs.length) {
                        console.log('All images loaded!');
                        loadData(); // load varible datas
                        create(); // build gallery
                    }
                }, false);
            }
        });
    }

    _createClass(CubeGallery, [{
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            // gallery width
            this.galleryWidth = this.gallery.offsetWidth;

            // images
            this.images = document.querySelectorAll('#' + this.id + ' img');
            this.images.forEach(function (img) {
                img.width = Math.floor(img.naturalWidth * _this2.minHeight / img.naturalHeight), // default width
                img.height = _this2.minHeight; // default height
            });
            // count images
            this.nbImages = this.images.length;
        }

        // check if element has borders

    }, {
        key: 'findExtraWidth',
        value: function findExtraWidth(elm) {
            var borders = getComputedStyle(elm);
            var borderLeft = Number(borders.borderLeftWidth.substr(0, borders.borderLeftWidth.length - 2));
            var borderRight = Number(borders.borderRightWidth.substr(0, borders.borderLeftWidth.length - 2));
            this.extra = this.extra + borderLeft + borderRight;
        }
    }]);

    return CubeGallery;
}();

CubeGallery.prototype.resize = function () {
    this.loadData();
    return this.create();
};

CubeGallery.prototype.create = function () {
    var _this3 = this;

    var rows = [];
    var imgs = [];
    var sumOfWidth = 0; // sum of the width of the images
    for (var i = 0; i < this.nbImages; i++) {
        var currentImg = this.images[i];
        var nextImg = this.images[i + 1] != undefined ? this.images[i + 1] : null;

        sumOfWidth = Math.floor(sumOfWidth + currentImg.width);

        imgs.push(currentImg);

        if (nextImg == null || Math.floor(sumOfWidth + nextImg.width) > this.galleryWidth) {
            // if row is filled
            rows.push(imgs);
            sumOfWidth = 0;
            imgs = [];
        }
    }

    rows.forEach(function (imgs) {
        var sumOfWidth = 0; // sum of the width of the images
        imgs.forEach(function (img) {
            return sumOfWidth = Math.floor(sumOfWidth + img.width);
        });
        imgs.forEach(function (img) {
            img.width = Math.floor(img.width * (img.height * _this3.galleryWidth / sumOfWidth) / img.height - _this3.margin * 2 - _this3.extra);
            img.height = Math.floor(img.height * _this3.galleryWidth / sumOfWidth - _this3.margin * 2 - _this3.extra);
            img.style.margin = _this3.margin + 'px';
        });
    });

    return this;
};
//# sourceMappingURL=cube-gallery.js.map
