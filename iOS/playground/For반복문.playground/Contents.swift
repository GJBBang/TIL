import UIKit

// 0...5 >> 0, 1, 2, 3, 4, 5 (range(6))
// 0...<5 >> 0, 1, 2, 3, 4 (range(5))

//for index in 0...5 {
//    print("호호 index: \(index)")
//}

for index in 0..<5 where index % 2 == 0 {
    print("호호 index: \(index)")
}

var randomInts: [Int] = []
//var randomInts: [Int] = [Int]()

for _ in 0..<25 {
    let rendomNumber = Int.random(in: 0...100)
    randomInts.append(rendomNumber)
}

print("randomInts: \(randomInts)")
