import http from 'k6/http';
import {sleep, check} from 'k6';

// export default function() {
//   http.get('http://localhost:3000/qa/questions');
//   sleep(1);
// }



// export default function() {
//   let res = http.get('http://localhost:3000/qa/questions?product_id=18078');
//   check(res, {
//     'is Status 200': (r) => r.status === 200,
//   });
// }

// export let options = {
//   stages: [{duration: '15s', target: 250}, {duration: '20s', target: 500}]
// }



// ===== Testing GET Questions ======
// export default function() {
//   for (var product_id = 1000000; product_id >= 1000000 - 1000; product_id--) {
  //     let res = http.get(`http://localhost:3000/qa/questions?product_id=${product_id}`);
  //     check(res, {
    //       'Is Status 200?': (r) => r.status === 200,
    //       'Is response time < 2000ms': (r) => r.timings.duration < 2000,
    //     });
    //     sleep(1);
    //   }
    // }


export let options = {
  stages: [{duration: '15s', target: 10000}]
}

// ===== Testing GET Answers ======
export default function() {
  for (var question_id = 6879306; question_id >= 6879306 - 1000; question_id--) {
    let res = http.get(`http://localhost:3000/qa/answers?question_id=${question_id}`);
    check(res, {
      'Is Status 200?': (r) => r.status === 200,
      'Is response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    sleep(1);
  }
}

// export default function() {
//   var params = {
//     'name': 'Billy',
//   },

//   for (var product_id = 1000011; product_id >= 1000011 - 1000; product_id--) {
//     let res = http.get(`http://localhost:3000/qa/questions?product_id=${product_id}`, params);
//     check(res, {
//       'Is Status 200?': (r) => r.status === 200,
//       'Is response time < 2000ms': (r) => r.timings.duration < 2000,
//     });
//     sleep(1);
//   }
// }

// k6 run stressTest.js
// k6 run stressTest.js --vus=500 --duration=35s