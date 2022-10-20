import UIKit

var title = ""

let jobTitle = "개발자"

//jobTitle = "호로롤"

func sayName(_ name: String){
    print("안녕? 난 \(name) 라고 해")
}

func sayHi(_ name: inout String){
    name = "개발하는 " + name
    print("안녕? 난 \(name) 라고 해")
}

sayName("빵기진")

var name = "철수"

sayHi(&name)
