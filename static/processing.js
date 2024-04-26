console.log('script.js says "I\'m here"');
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);


let grayed = false;
imgElement.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    changeGray_Color();
    callback();
    type_blur();
    mat.delete();
};


function type_blur() {
    let blur_type = document.getElementById('blur_type')
    let selOpt = blur_type.options[blur_type.selectedIndex].value;

    let image_type = document.getElementById('image_type')
    let imgOpt = image_type.options[image_type.selectedIndex].value;
    let src;
    if (imgOpt == 'source') {
        src = cv.imread('canvasOutput');
    }
    else if (imgOpt == 'thresh') {
        src = cv.imread('threshOutput');
    }
    if (selOpt == 'BLUR') {
        blur(src);
    }
    if (selOpt == 'GAUSSIAN_BLUR') {
        gaussian_blur(src);
    }
    if (selOpt == 'MEDIAN_BLUR') {
        median_blur(src);
    }
    if (selOpt == 'BILATERAL_FILTER') {
        bilateral_filter(src);
    }
};

function blur(src) {
    let dst = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    let anchor = new cv.Point(-1, -1);
    cv.blur(src, dst, ksize, anchor, cv.BORDER_DEFAULT);
    cv.imshow('blurOutput', dst);
    src.delete(); dst.delete();
};

function gaussian_blur(src) {
    let dst = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    cv.imshow('blurOutput', dst);
    src.delete(); dst.delete();
};

function median_blur(src) {
    let dst = new cv.Mat();
    cv.medianBlur(src, dst, 5);
    cv.imshow('blurOutput', dst);
    src.delete(); dst.delete();
};

function bilateral_filter(src) {
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    cv.bilateralFilter(src, dst, 9, 75, 75, cv.BORDER_DEFAULT);
    cv.imshow('blurOutput', dst);
    src.delete(); dst.delete();
};

function changeToGray(grayed) {
    let button = document.getElementById('grayButton');
    if (grayed == false) {
        let src = cv.imread('imageSrc');
        let dst = new cv.Mat();
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow('canvasOutput', dst);
        src.delete(); dst.delete();
        button.textContent = "Change To Color";
        return true;
    }
    else {
        let src = cv.imread('imageSrc');
        button.textContent = "Change To Gray";
        cv.imshow('canvasOutput', src);
        src.delete();
        return false;
    }

};

function changeGray_Color() {
    grayed = changeToGray(grayed);
};

function thresh_binary() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let weightValue = document.getElementById('weightValue');
    let value = weightValue.getAttribute('value');
    cv.threshold(src, dst, parseInt(value), 255, cv.THRESH_BINARY);
    cv.imshow('threshOutput', dst);
    src.delete();
    dst.delete();
};
function thresh_binary_inv() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let weightValue = document.getElementById('weightValue');
    let value = weightValue.getAttribute('value');
    cv.threshold(src, dst, parseInt(value), 255, cv.THRESH_BINARY_INV);
    cv.imshow('threshOutput', dst);
    src.delete();
    dst.delete();
};
function thresh_trunc() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let weightValue = document.getElementById('weightValue');
    let value = weightValue.getAttribute('value');
    cv.threshold(src, dst, parseInt(value), 255, cv.THRESH_TRUNC);
    cv.imshow('threshOutput', dst);
    src.delete();
    dst.delete();
};
function thresh_tozero() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let weightValue = document.getElementById('weightValue');
    let value = weightValue.getAttribute('value');
    cv.threshold(src, dst, parseInt(value), 255, cv.THRESH_TOZERO);
    cv.imshow('threshOutput', dst);
    src.delete();
    dst.delete();
};
function thresh_otsu() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
    cv.imshow('threshOutput', gray);
    src.delete(); dst.delete(); gray.delete();
};
function thresh_triangle() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_TRIANGLE);
    cv.imshow('threshOutput', gray);
    src.delete(); dst.delete(); gray.delete();
};
function thresh_adaptive_g() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let weightValue = document.getElementById('weightValue');
    let value = weightValue.getAttribute('value');
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.adaptiveThreshold(gray, gray, parseInt(value), cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
    cv.imshow('threshOutput', gray);
    src.delete(); dst.delete(); gray.delete();
};
function thresh_adaptive_m() {
    let src = cv.imread('canvasOutput');
    let dst = new cv.Mat();
    let weightValue = document.getElementById('weightValue');
    let value = weightValue.getAttribute('value');
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.adaptiveThreshold(gray, gray, parseInt(value), cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 3, 2);
    cv.imshow('threshOutput', gray);
    src.delete(); dst.delete(); gray.delete();
};

function callback() {
    let weightValue = document.getElementById('weightValue');
    let trackbar = document.getElementById('trackbar');
    weightValue.setAttribute('value', trackbar.value);
    let thresh_type = document.getElementById('thresh_type')
    let selOpt = thresh_type.options[thresh_type.selectedIndex].value;
    if (selOpt == 'THRESH_BINARY') {
        thresh_binary();
    }
    else if (selOpt == 'THRESH_BINARY_INV') {
        thresh_binary_inv();
    }
    else if (selOpt == 'THRESH_TRUNC') {
        thresh_trunc();
    }
    else if (selOpt == 'THRESH_TOZERO') {
        thresh_tozero();
    }
    else if (selOpt == 'THRESH_OTSU') {
        thresh_otsu();
    }
    else if (selOpt == 'THRESH_TRIANGLE') {
        thresh_triangle();
    }
    else if (selOpt == 'THRESH_ADAPTIVE_GAUSSIAN') {
        thresh_adaptive_g();
    }
    else if (selOpt == 'THRESH_ADAPTIVE_MEAN') {
        thresh_adaptive_m();
    }
};

function sendImage() {
    let image = new Image();
    let canvas = document.getElementById('threshOutput');
    let input = document.getElementById('imageInput');
    input.classList.add('hidden')
    image.src = canvas.toDataURL();
    input.value = image.src;   
};

function SelectedImg(elem) {
    let canThresh = document.getElementById('threshOutput');
    let canBlur = document.getElementById('blurOutput');
    let canGray = document.getElementById('canvasOutput');
    let btn = document.getElementById('saveButton');
    let btnTxt = document.getElementById('imageInput');
    if (elem == 'threshOutput') {
        canThresh.classList.add('selected');
        if (canBlur.classList.contains('selected')) { canBlur.classList.remove('selected') }
        if (canGray.classList.contains('selected')) { canGray.classList.remove('selected') }
    }
    if (elem == 'canvasOutput') {
        canGray.classList.add('selected');
        if (canBlur.classList.contains('selected')) { canBlur.classList.remove('selected') }
        if (canThresh.classList.contains('selected')) { canThresh.classList.remove('selected') }
    }
    if (elem == 'blurOutput') {
        canBlur.classList.add('selected');
        if (canThresh.classList.contains('selected')) { canThresh.classList.remove('selected') }
        if (canGray.classList.contains('selected')) { canGray.classList.remove('selected') }
    }

    btn.disabled=false;
    btnTxt.disabled=false;
};

function downloadImage(){
    let canvas = document.getElementsByClassName('selected');
    canvas[0].toBlob(function(blob){saveAs(blob,"process_img.png");},'image/png');   
  };