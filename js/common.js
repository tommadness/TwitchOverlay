function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function textColorContrast(bgColorHex){
    var rgb = hexToRgb(bgColorHex);
    const brightness = Math.round(((parseInt(rgb.r) * 299) +
                      (parseInt(rgb.g) * 587) +
                      (parseInt(rgb.b) * 114)) / 1000);

    return (brightness > 125) ? 'black' : 'white';
  }

  function sanitize(string){
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }

  function replaceEmotes(message, emoteArray){
    if (emoteArray == null){
        return message;
    }
    const stringReplacements = [];

    Object.entries(emoteArray).forEach(([id, positions]) => {
        const position = positions[0];
        const [start,end] = position.split("-");
        const stringToReplace = message.substring(
            parseInt(start, 10),
            parseInt(end, 10) + 1
        );

        stringReplacements.push({
            stringToReplace: stringToReplace,
            replacement: `<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0">`
        })
    })

    const messageHTML = stringReplacements.reduce(
        (acc, { stringToReplace, replacement }) => {
          // obs browser doesn't seam to know about replaceAll
          return acc.split(stringToReplace).join(replacement);
        },
        message
      );
    
      return messageHTML;
  }