import UIKit

// 파이널 클래스 >> 상속을 할 수 없는 클래스
final class Friend {
    
    var name : String
    
    init(name: String){
        self.name = name
    }
}

// 에러 발생
//class BestFriend : Friend {
//
//    override init(name: String) {
//        super.init(name: "베프 " + name)
//    }
//}

let myFriend = Friend(name: "빵기진")

//let myBestFriend = BestFriend("영희")
