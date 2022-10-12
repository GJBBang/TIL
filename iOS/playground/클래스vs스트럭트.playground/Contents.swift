import UIKit

// 유튜버 (데이터) 모델 - struct / 구조체
struct YoutuberStruct {
    var name : String
    var subscribersCount : Int
}

var devBBang = YoutuberStruct(name: "방기진", subscribersCount: 9999)
// 값 복사
var devBBangClone = devBBang

print("========== struct ==========")

print("값 넣기 전 devBBangClone.name: \(devBBangClone.name)")

devBBangClone.name = "호롤롤로"

print("값 넣은 후 devBBangClone.name: \(devBBangClone.name)")
print("값 넣은 후 devBBang.name: \(devBBang.name)")

// 클래스
class YoutuberClass {
    var name : String
    var subscribersCount : Int
    // 생성자 - 즉 메모리에 올린다
    // init 으로 매개변수를 가진 생성자 메소드를 만들어야
    // 매개변수를 넣어서 그 값을 가진 객체를 만들 수 있다.
    init(name: String, subscribersCount: Int){
        self.name = name
        self.subscribersCount = subscribersCount
    }
}

var bbangGiJin = YoutuberClass(name: "방기진", subscribersCount: 9999)
// 메모리 참조
var bbangGiJinClone = bbangGiJin

print("========== class ==========")

print("값 넣기 전 bbangGiJinClone.name: \(bbangGiJinClone.name)")

bbangGiJinClone.name = "호롤롤롤롤롤롤롤"

print("값 넣은 후 bbangGiJinClone.name: \(bbangGiJinClone.name)")
print("값 넣은 후 bbangGiJin.name: \(bbangGiJin.name)")
