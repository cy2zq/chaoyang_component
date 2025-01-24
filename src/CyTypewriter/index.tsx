let $ = window.$;
import { useEffect, useState, type FC } from 'react';

const Foo: FC<{ content: any; isRepeat: any }> = (props) => {
  const [finish, setFinish] = useState(false);
  useEffect(() => {
    $.fn.typewriter = function () {
      this.each(function () {
        let $ele = $(this),
          str = $ele.html(),
          progress = 0;
        $ele.html('');
        let timer = setInterval(function () {
          let current = str.substr(progress, 1);
          if (current == '<') {
            progress = str.indexOf('>', progress) + 1;
          } else {
            progress++;
          }
          $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
          if (progress >= str.length) {
            clearInterval(timer);
            if (props.isRepeat) {
              setFinish(true);
            } else {
              setFinish(false);
            }
          }
        }, 75);
      });
      return this;
    };

    $(function () {
      $('#code').typewriter();
    });
  }, [finish]);
  return <p id="code">{props.content}</p>;
};

export default Foo;
