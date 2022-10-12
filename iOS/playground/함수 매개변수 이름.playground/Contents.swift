import UIKit

// 함수, 메소드 정의, 함수 호출시 매개변수 이름 name
func myFunction(name: String) -> String{
    return "안녕하세요?? \(name) 입니다."
}

// 함수, 메소드를 호출. call
myFunction(name: "빵기진")

// 함수, 메소드 정의, 함수 내에서 name, 함수 호출 시 매개변수 이름 with
func myFunctionSecond(with name: String) -> String{
    return "안녕하세요?? \(name) 입니다."
}

// 함수, 메소드를 호출. call
myFunctionSecond(with: "빵기진")

// 함수, 메소드 정의, 매개변수 이름 생략 가능
func myFunctionThird(_ name: String) -> String{
    return "안녕하세요?? \(name) 입니다."
}

// 함수, 메소드를 호출. call
myFunctionThird("빵기진")
