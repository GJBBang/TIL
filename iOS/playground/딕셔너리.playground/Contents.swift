import UIKit

// 키 : 값
var myFriends = [
    "bestFriend" : "빵기진",
    "highschool" : "영희"
]

let myBestFriend = myFriends["bestFriend"]

let highschoolFriend = myFriends["highschool"]

let youtubeFriend = myFriends["youtube", default: "친구없음"]

myFriends["bestFriend"] = "개발하는 빵기진"

let myBF = myFriends["bestFriend"]

myFriends["newFriend"] = "철수"

let newFriend = myFriends["newFriend"]

myFriends.updateValue("수진", forKey: "girlFriend")

let girlFriend = myFriends["girlFriend"]

myFriends.updateValue("카이사", forKey: "bestFriend")

//let emptyDictionary : [String : Int] = [:]
//let emptyDictionary : [String : Int] = [String : Int]()
let emptyDictionary = [String : Int]()

let myEmptyDictionary : [String : Int] = Dictionary<String, Int>()

myFriends.count

for item in myFriends {
    print("item : ", item)
}
