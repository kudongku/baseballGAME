$('#result_toggle').toggle();

let Num = generateNum();

function generateNum() {
  let arr = [];
  while (arr.length != 3) {
    var i = Math.floor(Math.random() * 10);

    if (i == 0 && arr.length == 0) {
      continue;
    }

    if (arr.indexOf(i) == -1) {
      arr.push(i);
    }
  }
  console.log(arr);
  return arr;
}
function checkValidation(arr) {
  if (arr.length != 3) {
    return 1;
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i != j && arr[i] == arr[j]) {
        return 2;
      }
    }

    if (arr[i] < 0 || arr[i] > 9) {
      return 4;
    }

    if (isNaN(arr[i])) {
      return 5;
    }
  }
  if (arr[0] == 0) {
    return 3;
  }
  return 0;
}

let count = 0; //이닝 수
let out_sum = 0; //총 아웃 수

$('#throwing_btn').click(async function () {
  //사용자 입력 숫자 변환 ex) 1 2 3
  let throws = $('#throw').val();
  let throw_arr = throws.split(' ');
  console.log(throw_arr);
  //throw_arr=[1,2,3] 3자리 중복없는 수

  //사용자 입력 숫자 유효성 검사, 0일 시 정상
  let val_code = checkValidation(throw_arr);
  if (val_code == 1) {
    alert('숫자 사이에 띄어쓰기를 입력하세요.');
    return;
  } else if (val_code == 2) {
    alert('숫자는 중복되면 안됩니다.');
    return;
  } else if (val_code == 3) {
    alert('0이 맨앞에 올 수 없습니다.');
    return;
  } else if (val_code == 4) {
    alert('숫자는 0부터 9까지입니다.');
    return;
  } else if (val_code == 5) {
    alert('숫자만 입력해주세요.');
    return;
  }

  //이닝 시작
  count++;
  let temp_html = `<li>${count}이닝, `;
  let score = [0, 0]; //score = [strike, ball]

  throw_arr.forEach((a, i) => {
    if (Num.indexOf(Number(a)) != -1) {
      if (i == Num.indexOf(Number(a))) {
        score[0]++;
      } else {
        score[1]++;
      }
    }
  });

  if (score[0] == 3) {
    temp_html += `3 strike!!!</li>`;
    $('#result_toggle').text('쓰리 스트라이크, 승리');
    $('#result_toggle').toggle();
  } else if ((score[0] == 0) & (score[1] == 0)) {
    temp_html += `out!!!</li>`;
    out_sum++;
  } else {
    temp_html += `strike : ${score[0]},   ball : ${score[1]}</li>`;
  }

  $('#records').append(temp_html);

  if (out_sum >= 3) {
    $('#result_toggle').text('쓰리 아웃, 패배');
    $('#result_toggle').toggle();
  }

  if (count == 9 && score[0] != 3) {
    $('#result_toggle').text('9이닝 종료, 패배');
    $('#result_toggle').toggle();
  }
});
