var CLEAR_GIF = 'data:image/gif;' +
    'base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

var DEFAULT_LOGO = CLEAR_GIF;
var DEFAULT_PRODUCT = CLEAR_GIF;

/**
 * @typedef {{
 *   height: number,
 *   width: number,
 *   halfWidth: number,
 *   halfHeight: number
 * }}
 * @private
 */
var ShapeDimensions_;

// Template dimensions.
var templateWidth;
var templateHeight;


/**
 * String variables for canvas.
 * @enum {string}
 */
var Canvas = {
  BADGE_ELEMENT: 'badge',
  CANVAS_CONTEXT: '2d',
  CANVAS_ELEMENT: 'canvas',
  CSS_POSITION: 'absolute',
  FONT_FAMILY_ATTR: 'font-family',
  FONT_SIZE_ATTR: 'font-size',
  PIXEL_RATIO_WEBKIT: 'webkitBackingStorePixelRatio',
  PIXEL_RATIO_MOZ: 'mozBackingStorePixelRatio',
  PIXEL_RATIO_MS: 'msBackingStorePixelRatio',
  PIXEL_RATIO_O: 'oBackingStorePixelRatio',
  PIXEL_RATIO_: 'backingStorePixelRatio',
  TEXT_ALIGN: 'center',
  TEXT_BASE_LINE: 'middle',
};


/**
 * Representation for the max value the sale discount limit.
 * @private {number}
 */
var MAX_SALE_DISCOUNT_VALUE_ = 100;


var MinimalAd = function() {
  this.badge = null;
  this.baseAnchor = document.getElementById('adDestination');
  this.backgroundColor = '';
  this.backgroundColorContrast = '';
  this.textColor = '';
  this.fontFamily = '';
  this.fontSize = '';
  this.text = '';
  this.canvas = null;
  this.context = null;
  this.discount = 0;
  this.logoArea = document.getElementById('logoArea');
  this.logo = document.getElementById('logo');
  this.pixelRatio = 0;
  this.badgeDimensions = {};

  // The product page to exit to. If the value is undefined then it defaults to
  // the normal destination URL.
  this.destinationProduct_ = undefined;

  // The exit util.
  this.util_ = undefined;

  this.baseAnchor.addEventListener(
      'click', this.clickHandler.bind(this), false);

  // Set up logo.
  this.logo.src = DEFAULT_LOGO;
  this.logoFillImage = new FillImage(this.logoArea, this.logo);

  // Set up a background
  var adAreaEl = document.getElementsByClassName('adArea')[0];
  this.adAreaBg = adAreaEl.cloneNode(false /* not deep */);
  this.adAreaBg.className += ' adSize';
  this.adAreaBg.style.position = 'absolute';
  this.adAreaBg.style.zIndex = -1;
  adAreaEl.parentNode.insertBefore(this.adAreaBg, adAreaEl);

  // Set up a local style element for css class overrides.
  this.localStyle = document.createElement('style');
  this.localStyle.type = 'text/css';
  document.head.appendChild(this.localStyle);

  // Configure products.
  this.products = [];
  var productElements = this.baseAnchor.querySelectorAll('.product');
  for (var i = 0, l = productElements.length; i < l; ++i) {
    this.products.push(new Product(this, productElements[i]));
  }
};


/**
 * Handles ad click.
 * @param {!Object} e Event object.
 */
MinimalAd.prototype.clickHandler = function(e) {
  if (this.util_) {
    this.util_.exit(this.destinationProduct_);
  }
  e.preventDefault();
};


/**
 * Configures the visual elements for the Minimal template.
 * @param {Object} adData Payload data object.
 * @param {Object} util Payload exit data object.
 */
MinimalAd.prototype.setAdData = function(adData, util) {

  // Flatten the hierarchy for template data.
  this.adData = adData;
  this.rawData = adData.google_template_data.adData[0];
  templateWidth = adData.google_width;
  templateHeight = adData.google_height;
  var templateAdData = getStructuredData(this.rawData);

  // Configure the base link.
  this.util_ = util;
  this.baseAnchor.target = '_top';

  // We register a listener for clicks in the body with useCapture=true
  // so that it won't trigger if any other click listener with
  // useCapture=false has already consumed the event.
  var thisRef = this;
  document.body.addEventListener('click', function() {
    // Sets the global location back to the destination URL if the
    // Headline_0_productClickOnly field value is false.
    if (templateAdData.Headline[0]['productClickOnly'] == 'FALSE') {
      thisRef.setDestination();
    }
  }, true);

  // Sets the global location back to the first product URL or to the
  // destination URL if there is no product URL.
  var firstProductUrl = templateAdData.Product[0].url;
  if (firstProductUrl) {
    this.setDestination('Product_0_url');
  }

  this.setDesign(templateAdData.Design[0]);
  this.setProducts(templateAdData.Product, templateAdData.Design[0]);
};


/**
 * Sets base destination for the ad.
 * @param {string=} opt_destination Ad destination.
 */
MinimalAd.prototype.setDestination = function(opt_destination) {
  if (opt_destination) {
    this.baseAnchor.href = this.rawData[opt_destination];
    this.destinationProduct_ = opt_destination;
  } else {
    this.baseAnchor.href = '';
    this.destinationProduct_ = '';
  }
};


/**
 * Sets dynamic styles for the ad.
 * @param {Object} designData Design data from the payload.
 */
MinimalAd.prototype.setDesign = function(designData) {
  this.applyLogoStyles_(designData);
  this.applyBackgroundStyles_(designData);

  // Reset the local css overrides.
  var newLocalStyleHtml = '';

  // Set rounded corners.
  if (designData.cornerStyle && designData.cornerStyle == 'square') {
    newLocalStyleHtml += '.roundedCorners { border-radius: 0; }';
  }

  // Apply css overrides.
  this.localStyle.innerHTML = newLocalStyleHtml;
};


/**
 * Applies dynamic styles to the logo element.
 * @param {Object} designData Design data from the payload.
 * @private
 */
MinimalAd.prototype.applyLogoStyles_ = function(designData) {
  this.logo.src = designData.logoImageUrl || DEFAULT_LOGO;
  this.logoFillImage.setAdditionalPadding(designData.logoPadding);
};


/**
 * Applies dynamic styles to the ad background.
 * @param {Object} designData Design data from the payload.
 * @private
 */
MinimalAd.prototype.applyBackgroundStyles_ = function(designData) {
  this.adAreaBg.style.backgroundColor =
      normalizeHexColor(designData.bgColor) || '';
  this.adAreaBg.style.backgroundImage = cssUrl(designData.bgImageUrl) || '';
  this.adAreaBg.style.opacity = designData.bgAlpha || '';
};


/**
 * Sets products data from the payload.
 * @param {!Object} products Products object from the payload.
 * @param {!Object} designData Design object from the payload.
 */
MinimalAd.prototype.setProducts = function(products, designData) {
  for (var i = 0, length = this.products.length; i < length; ++i) {
    this.products[i].setData(products[i] || {}, 'Product_' + i + '_url',
        designData);
  }
};


/**
 * Returns a structured object where fields with name pattern
 * element_0_attribute are folded into a data[element][0][attribute]
 * object structure.
 * @param {Object} rawData the 'adData' element from the adData object.
 * @return {!Object} Returns structured data object.
 */
// TODO(abalthaser): Change to a typed class b/25628835.
function getStructuredData(rawData) {
  var dataObject = {};
  for (var datum in rawData) {
    var parts = datum.split(/_/);
    var element = parts.shift();
    var index = Number(parts.shift());
    var attribute = parts.join('');

    if (element && !isNaN(index) && attribute) {
      // Structured element.
      if (!dataObject[element]) {
        dataObject[element] = [];
      }
      if (!dataObject[element][index]) {
        dataObject[element][index] = {};
      }
      dataObject[element][index][attribute] = rawData[datum];
    } else {
      // Top-level element.
      dataObject[datum] = rawData[datum];
    }
  }
  return dataObject;
}

function normalizeHexColor(dataColor) {
  return dataColor ? dataColor.replace(/0x/, '#') : undefined;
}

function cssUrl(url) {
  return url ? 'url("' + url + '")' : undefined;
}

function pxToNumber(pxString) {
  return Number(pxString.replace(/px/, ''));
}



/**
 * Function create object that contains product parameters and functions
 * to handle click and rollover events.
 * @param  {string} ad Advertisement banner object class that contains main data
 * @param  {Element} baseDiv Div element that contains product DOM elements.
 * @constructor
 */
function Product(ad, baseDiv) {
  this.ad = ad;
  this.baseDiv = baseDiv;
  this.image = baseDiv.querySelector('.productImage');
  this.linkField = '';
  this.fillImage = new FillImage(this.baseDiv, this.image);

  var thisRef = this;
  this.baseDiv.addEventListener('mouseover', function() {
    thisRef.setProductDestination();
  }, false);
  // This listener takes precedence over the body click listener that has
  // userCapture=true, guaranteeing that this will run when clicking on the
  // product.
  this.baseDiv.addEventListener('click', function() {
    thisRef.setProductDestination();
  }, false);

  this.image.src = DEFAULT_PRODUCT;
}


/**
 * Sets product destination link.
 */
Product.prototype.setProductDestination = function() {
  if (this.linkField) {
    // Set the global location to this product url.
    this.ad.setDestination(this.linkField);
  }
};


/**
 * Sets data to every product HTML placeholder.
 * @param {!Object} productData Object with product data from the payload.
 * @param {string} linkField Formatted product destiantion URL.
 * @param {Object} designData Design data from the payload.
 */
 Product.prototype.setData = function(productData, linkField, designData) {
  this.image.src = productData.imageUrl || DEFAULT_PRODUCT;
  this.linkField = linkField;
  this.discount = Math.abs(Math.round(productData.salePercentDiscount * 100));

  if (isEmpty(productData.salePercentDiscount) || this.discount == 0) {
    return;
  }

  this.setCanvasValues(productData, designData);
  this.buildCanvasElements(this.badgeDimensions.height,
      this.badgeDimensions.width);

  this.badge.appendChild(this.canvas);
};


/**
 * Sets values required for the canvas elements.
 * @param {!Object} productData Object with product data from the payload.
 * @param {!Object} designData Design data from the payload.
 */
Product.prototype.setCanvasValues = function(productData, designData) {
  this.backgroundColor = designData.btnColor.toColor();
  this.backgroundColorContrast = designData.btnColor.changeBrightness(-0.2);
  this.textColor = designData.txtColorCta.toColor();
  this.badge = this.baseDiv.getElementsByTagName(Canvas.BADGE_ELEMENT)[0];
  this.badgeDimensions = this.badge.getBoundingClientRect();
  this.fontFamily = getComputedStyle(this.badge).getPropertyValue(
      Canvas.FONT_FAMILY_ATTR);
  this.fontSize = getComputedStyle(this.badge).getPropertyValue(
      Canvas.FONT_SIZE_ATTR);

  this.discount = Math.min(this.discount, MAX_SALE_DISCOUNT_VALUE_);
  this.text = '-' + this.discount + '%';
};


/**
 * Builds the canvas elements.
 * @param {number} height number with CSS declared height.
 * @param {number} width number with CSS declared width.
 */
Product.prototype.buildCanvasElements = function(height, width) {
  ShapeDimensions_ = new GetShapedDimensions(height, width);

  this.canvas = document.createElement(Canvas.CANVAS_ELEMENT);
  this.canvas.height = ShapeDimensions_.height;
  this.canvas.width = ShapeDimensions_.width;
  this.canvas.style.position = Canvas.CSS_POSITION;
  this.context = this.canvas.getContext(Canvas.CANVAS_CONTEXT);
  this.setPixelRatio();

  if (this.pixelRatio > 1) {
    ShapeDimensions_ = this.adjustDimensions(ShapeDimensions_);
  }

  this.drawArrow(ShapeDimensions_);
};


/**
 * Returns an instance of parsed width and height and also half of the width
 * and height.
 * @param {number} height number with CSS declared height.
 * @param {number} width number with CSS declared width.
 * @constructor
 */
function GetShapedDimensions(height, width) {

  /**
   * Height derived from the bounding client rect of the badge element.
   * @type {number}
   */
  this.height = parseInt(height, 10) || 0;

  /**
   * Width derived from the bounding client rect of the badge element.
   * @type {number}
   */
  this.width = parseInt(width, 10) || 0;

  /**
   * Half the width of the width member.
   * @type {number}
   */
  this.halfWidth = parseInt(width / 2, 10);

  /**
   * Half the height of the height member.
   * @type {number}
   */
  this.halfHeight = parseInt(height / 2, 10);
}


/**
 * Sets pixel ratio.
 */
Product.prototype.setPixelRatio = function() {
  var backingStorePixelRatio = this.canvas[Canvas.PIXEL_RATIO_WEBKIT] ||
      this.canvas[Canvas.PIXEL_RATIO_MOZ] ||
      this.canvas[Canvas.PIXEL_RATIO_MS] ||
      this.canvas[Canvas.PIXEL_RATIO_O] ||
      this.canvas[Canvas.PIXEL_RATIO_] || 1;
  var devicePixelRatio = window.devicePixelRatio || 1;
  this.pixelRatio = devicePixelRatio / backingStorePixelRatio;
};


/**
 * Adjusts dimensions of ShapeDimensions_ object.
 * @param {!ShapeDimensions_} ShapeDimensions_ Object adjusted.
 * @return {!ShapeDimensions_} ShapeDimensions_ Object with computed canvas
 *    data.
 */
Product.prototype.adjustDimensions = function(ShapeDimensions_) {
  this.canvas.style.height = ShapeDimensions_.height + 'px';
  this.canvas.style.width = ShapeDimensions_.width + 'px';
  ShapeDimensions_.halfHeight *= this.pixelRatio;
  ShapeDimensions_.halfWidth *= this.pixelRatio;

  ShapeDimensions_.height *= this.pixelRatio;
  ShapeDimensions_.width *= this.pixelRatio;

  // Adjust canvas.
  this.canvas.height = ShapeDimensions_.height;
  this.canvas.width = ShapeDimensions_.width;

  return ShapeDimensions_;
};


/**
 * Draws the canvas elements.
 */
Product.prototype.drawArrow = function(ShapeDimensions_) {
  this.canvas.height = ShapeDimensions_.height +
      (ShapeDimensions_.height * 0.15);
  var shapeHeight = ShapeDimensions_.height;
  var shapeWidth = ShapeDimensions_.width;
  var offsetStartPointY = shapeHeight * 0.15;
  var offsetWidth = shapeWidth / 2.5;
  var halfHeight = shapeHeight / 2;
  var rectXPoint = shapeWidth / 4;
  var arrowPointerWidth = parseInt(shapeWidth / 5, 10);
  var textPosition = {
    x: arrowPointerWidth * 3.2,
    y: ShapeDimensions_.halfHeight
  };

  if (this.context) {
    this.context.moveTo(0, offsetStartPointY);
    this.context.lineTo(offsetWidth, offsetStartPointY);
    this.context.lineTo(offsetWidth, offsetStartPointY + shapeHeight);
    this.context.lineTo(0, offsetStartPointY + shapeHeight);
    this.context.lineTo(arrowPointerWidth, halfHeight + offsetStartPointY);
    this.context.lineTo(0, offsetStartPointY)

    this.context.moveTo(rectXPoint, 0);
    this.context.lineTo(shapeWidth, 0);
    this.context.lineTo(shapeWidth, shapeHeight);
    this.context.lineTo(rectXPoint, shapeHeight);
    this.context.lineTo(rectXPoint, 0);

    this.context.fillStyle = this.backgroundColor;
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(rectXPoint - 1, 0);
    this.context.lineTo(rectXPoint - 1, shapeHeight);
    this.context.closePath();

    this.context.strokeStyle = this.backgroundColorContrast;
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(rectXPoint, shapeHeight);
    this.context.lineTo(offsetWidth, shapeHeight);
    this.context.lineTo(offsetWidth, shapeHeight + offsetStartPointY);
    this.context.lineTo(rectXPoint, shapeHeight);

    this.context.strokeStyle = this.backgroundColorContrast;
    this.context.fillStyle = this.backgroundColorContrast;
    this.context.fill();

    var fontSizeValue = parseInt(this.fontSize, 10) * this.pixelRatio;
    this.context.restore();
    this.context.fillStyle = this.textColor;
    this.context.font = 'bold' + ' ' + fontSizeValue + 'px ' + this.fontFamily;
    this.context.textAlign = Canvas.TEXT_ALIGN;
    this.context.textBaseline = Canvas.TEXT_BASE_LINE;
    this.context.fillText(this.text, textPosition.x, textPosition.y);
  }
};


/**
 * An image that fills its bounding element but maintains aspect ratio.
 * @param {Element} baseDiv Placeholder which contains the image.
 * @param {Object} image Object that contains image element and image data.
 * @constructor
 */
function FillImage(baseDiv, image) {
  this.originalClass = image.className || '';
  this.baseDiv = baseDiv;
  this.image = image;
  this.additionalPadding = 0;

  var baseDivStyle = window.getComputedStyle(this.baseDiv);

  // If the container iframe has "display: none" in Firefox, baseDivStyle will
  // be null. We can just return, as the ad won't even be visible.
  if (baseDivStyle == null) {
    return;
  }

  this.originalPadding = pxToNumber(baseDivStyle.padding);
  this.originalWidth = pxToNumber(baseDivStyle.width);
  this.originalHeight = pxToNumber(baseDivStyle.height);

  var thisRef = this;
  image.addEventListener('load', function() {
    thisRef.updateSize();
  }, false);

  this.updateSize();
}


/**
 * Sets additional padding for the image within the baseDiv.
 * @param {number} paddingInPixels Additional padding for the image.
 */
FillImage.prototype.setAdditionalPadding = function(paddingInPixels) {
  this.additionalPadding = Number(paddingInPixels);

  this.updateSize();
};


/**
 * Simulates setting the padding around the image, while keeping the
 * size of the container the same.
 */
FillImage.prototype.adjustPadding = function() {
  this.baseDiv.style.padding = (this.originalPadding +
      this.additionalPadding) + 'px';

  this.baseDiv.style.width = (this.originalWidth -
      2 * this.additionalPadding) + 'px';

  this.baseDiv.style.height = (this.originalHeight -
      2 * this.additionalPadding) + 'px';
};


/**
 * Sets correct sizes for the image placeholder depending on the image size and
 * its margin.
 */
FillImage.prototype.updateSize = function() {
  // Adjust padding first, so we get correct measurements.
  this.adjustPadding();

  var baseStyle = window.getComputedStyle(this.baseDiv);

  // If the container iframe has "display: none" in Firefox, baseStyle will
  // be null. We can just return, as the ad won't even be visible.
  if (baseStyle == null) {
    return;
  }

  var baseWidth = pxToNumber(baseStyle.width);
  var baseHeight = pxToNumber(baseStyle.height);
  var baseAspectRatio = baseWidth / baseHeight;

  // Reset the class before measuring the image.
  this.image.className = this.originalClass;

  var imageWidth = this.image.width;
  var imageHeight = this.image.height;
  var imageAspectRatio = imageWidth / imageHeight;

  // Ensure image fills in appropriate direction.
  var imageClass;
  if (imageAspectRatio > baseAspectRatio) {
    imageClass = ' wide';
  } else {
    imageClass = ' tall';
  }

  this.image.className = this.originalClass + imageClass;

  // Vertical Centering.
  // Adjust height margins. Width is handled in css by 'margin: auto'.
  var imageStyle = window.getComputedStyle(this.image);
  var imageStyledHeight = pxToNumber(imageStyle.height);
  var newTopMargin = Math.round((baseHeight - imageStyledHeight) / 2);

  this.image.style.marginTop = newTopMargin + 'px';
};


/**
 * String prototype to format string for a CSS color value.
 * @return {?string} Returns color formatted to full HEX value.
 */
String.prototype.toColor = function() {
  var return_obj = this;
  if (!this) {
    return null;
  }

  if (this.indexOf('#') != -1) {
    return_obj = this.replace(/#/g, '0x');
  }

  return '#' + return_obj.split('0x').join('');
};


/**
 * Verifies if the string from DAB is really empty.
 * @param {string} str String to verify.
 * @return {boolean} Returns true if the string is empty.
 */
var isEmpty = function(str) {
  if (!str) {
    return true;
  }
  str = str.trim();
  return !str || !str.length;
};


/**
 * String prototype to change color brightness.
 * @param {number} delta Accepts delta to change brightness.
 *    If delta is between -1 (including) and 0, the color will become darker.
 *    If delta is between 0 and 1 (including), the color will become lighter.
 * @return {?string} Formatted string like "rgb(r,g,b)".
 */
String.prototype.changeBrightness = function(delta) {
  if (!this) {
    return null;
  }

  var hex = this.toColor();
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var rgb = '', part;

  for (var i = 1; i < result.length; i++) {
    part = parseInt(result[i], 16);
    part += part * delta;
    rgb += Math.round(Math.min(Math.max(0, part), 255));

    if (i !== 3) {
      rgb += ',';
    }
  }

  return rgb ? 'rgb(' + rgb + ')' : null;
};
