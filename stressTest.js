import http from 'k6/http';
import {sleep, check} from 'k6';


// ================================
// ===== Testing GET Questions ====
// ================================

export let options = {
  stages: [{duration: '15s', target: 5000}]
}

export default function() {
  for (var product_id = 1000000; product_id >= 1000000 - 1000; product_id--) {
    let res = http.get(`http://localhost:3000/qa/questions?product_id=${product_id}`);
    check(res, {
        'Is Status 200?': (r) => r.status === 200,
        'Is response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    sleep(1);
  }
}



// ================================
// ===== Testing GET Answers ======
// ================================

// export let options = {
//   stages: [{duration: '15s', target: 10000}]
// }

// export default function() {
//   for (var question_id = 6879306; question_id >= 6879306 - 1000; question_id--) {
//     let res = http.get(`http://localhost:3000/qa/answers?question_id=${question_id}`);
//     check(res, {
//       'Is Status 200?': (r) => r.status === 200,
//       'Is response time < 2000ms': (r) => r.timings.duration < 2000,
//     });
//     sleep(1);
//   }
// }



// =============================================
// ===== Testing PUT Question Helpfulness ======
// =============================================


// =============================================
// ===== Testing PUT Question Reported =========
// =============================================


// =============================================
// ===== Testing PUT Answer Helpfulness ======
// =============================================


// =============================================
// ===== Testing PUT Answer Reported ===========
// =============================================




// k6 run stressTest.js
// k6 run stressTest.js --vus=500 --duration=35s
// export let options = {
//   stages: [{duration: '15s', target: 250}, {duration: '20s', target: 500}]
// }

// export let options = {
//   vus: 500,
//   duration: '15s'
// }