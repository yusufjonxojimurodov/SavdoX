export function cleanNumber(value) {
  return value ? value.replace(/[^0-9]/g, "") : "";
}

export function formatPhoneNumber(e) {
  var target = e.target;
  if (!target) return;

  var value = target.value;
  if (!value) return;

  var v = cleanNumber(value);
  var l = v.length;
  var lastValue;

  if (l < 3) {
    var reg = new RegExp("^([0-9]{2})");
    lastValue = v.replace(reg, "$1");
  } else if (l < 6) {
    var reg = new RegExp("^([0-9]{2})([0-9]{" + (l - 2) + "})");
    lastValue = v.replace(reg, "$1 $2");
  } else if (l < 8) {
    var reg = new RegExp("^([0-9]{2})([0-9]{3})([0-9]{" + (l - 5) + "})");
    lastValue = v.replace(reg, "$1 $2-$3");
  } else {
    var reg = new RegExp(
      "^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{" + (l - 7) + "})"
    );
    lastValue = v.replace(reg, "$1 $2-$3-$4");
  }

  target.value = lastValue || v;
  return lastValue;
}

export function formatPhoneNumberString(value) {
  if (!value) return "";

  var v = value.replace(/[^0-9]/g, "");
  var l = v.length;
  var lastValue = "";

  if (l < 3) {
    lastValue = v;
  } else if (l < 6) {
    lastValue = v.slice(0, 2) + " " + v.slice(2);
  } else if (l < 8) {
    lastValue = v.slice(0, 2) + " " + v.slice(2, 5) + "-" + v.slice(5);
  } else {
    lastValue =
      v.slice(0, 2) +
      " " +
      v.slice(2, 5) +
      "-" +
      v.slice(5, 7) +
      "-" +
      v.slice(7);
  }

  return lastValue;
}
