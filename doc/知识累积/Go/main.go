/*
	包名与导入路径的最后一个元素一直
	名字以大写字母开头，那么它就是已导出的。在导入一个包时，你只能引用其中已导出的名字。任何“未导出”的名字在该包外均无法访问
	函数可以没有参数或接受多个参数
	var 语句用于声明一个变量列表，跟函数的参数列表一样，类型在最后;变量声明可以包含初始值，每个变量对应一个，可以省略类型
	const 声明常量，可以是字符、字符串、布尔值或数值;不能使用:=语法
	在函数中，简洁赋值语句 := 可在类型明确的地方代替 var 声明。函数外的每个语句都必须以关键字开始
	Go的基本类型：
		bool，默认值是false
		string，默认值是""
		int、int8、int16、int32、int64，默认值是0
		uint、uint8、uint16、uint32、uint64 uintptr，默认值是0
		byte（int8），默认值是0
		rune（int32,unicode码点），默认值是0
		float32，默认值是0
		float(64)，默认值是0
		complex64，默认值是0
		complex128，默认值是0
		只有显式类型转换T(v)
	for循环语句：初始化语句；条件表达式；后置语句
		初始化语句仅在for作用域中可见
	if条件语句：同for一样，if语句可以在条件表达式之前执行一个简单的语句;简短语句的变量可以在else中使用
		if v := math.Pow(x, n); v < lim {
			// ...
		}
	switch多条件语句：可以没有XX
		switch XX: {
		case variable:
		case variable2:
		default:
			XXX
		}
		没有XX：
		switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}

	defer：推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用
		推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用
	指针：*T，指向T类型的指针，零值是nil；&操作符会生成一个指向其操作数的指针值；没有指针运算
		i,j := 42,2701
		p := &i
		*p = 21
	结构体（struct）：就是一组字段（field）;点号访问；结构体文法 通过直接列出字段的值来新分配一个结构体
		type Vertex struct {
			X int
			Y int
		}
		v := Vertext{1,2}
		v.X = 4
		p := &v
		p.X  // 正常是(*p).V，语言简化了，可以写成p.X，称为 隐式间接引用
	数组：[n]T表示拥有n个T类型的数组。数组的长度是其类型的一部分，因此数组不能改变大小
		var a [10]int
		primes := [6]int{1,2,3,4,5,6}
	切片：切片为数组元素提供动态大小的、灵活 视角 ，切片就像数组的引用；切片不存储数据，知识数组片段的描述
		[]T 表示一个元素类型为T的切片；切片通过两个下标来界定，即一个上界和一个下界，二者以冒号分隔；它会选择一个半开区间，包括第一个元素，但排除最后一个元素
		创建切片：
			a[1:4]，包含下标为1到3的元素
		make：make 函数会分配一个元素为零值的数组并返回一个引用了它的切片。创建动态数组的方式
		append：向切片追加元素
		Range：for 循环的 range，当使用 for 循环遍历切片时，每次迭代都会返回两个值。第一个值为当前元素的下标，第二个值为该下标所对应元素的一份副本。
			for i, v := range pow {
				fmt.Printf("2**%d = %d\n", i, v)
			}
	映射（map）：make 函数会返回给定类型的映射，并将其初始化备用
			type Vertex struct {
				Lat, Long float64
			}
			var m map[string]Vertex
			m = map[string]Vertex{
				"Monkey": Vertex{
					40.111,20.111
				},
				"Cat": Vertex{
					40.222,20.222
				}
			}

			m = map[string]Vertex {
				"Monkey": {
					40.111,20.111
				},
				"Cat": {
					40.222,20.222
				}
			}

			m = make(map[string]Vertex)
			m["Monkey"]=Vertex{40.111,20.111}

			// 修改、增加
			m[Mpnkey] = XXX
			// 获取
			elem := m[Monkey]
			// 删除
			delete(m, Monkey)
			// 检测
			elem, OK = m[key]
		函数值：函数也是值，可以像其他值一样传递
		闭包：是一个函数值，

		Go没有类，但是可以为结构体定义方法
		type Vertex struct {
			X, Y float64
		}
		// 结构体方法，方法接收者在它自己的参数列表内，位于 func 关键字和方法名之间
		// 为非结构体类型声明方法
		// 只能为在同一包内定义的类型的接收者声明方法，而不能为其它包内定义的类型
		// Abs方法拥有一个名为v，类型为Vertex的接收者
		func (v Vertex) Abs() float64 {
			return math.Sqrt(v.X*v.Y)
		}
		// 普通方法
		func Abs() float64 {
		}
	接口：接口类型是由一组方法签名定义的集合。接口类型变量可以保存任何实现了这些方法的值
		类型通过实现一个接口的所有方法来实现该接口
		接口也是值。它们可以像其它值一样传递
		空接口：空接口可保存任何类型的值。（因为每个类型都至少实现了零个方法。）空接口被用来处理未知类型的值
		类型断言： 提供了访问接口值底层具体值的方式
		类型选择：
		Stringer接口：可以用字符串描述自己的类型

		package main
		import (
			"fmt"
			"match"
		)
		type Abser interface {
			Abs() float64
		}

		func main() {
			var a Abser
			f := MyFloat(-math.Sqrt2)
			v := Vertex{3, 4}

			a = f
			a = &v
			a= v
			fmt.Println(a.Abs())
		}
		type MyFloat float64
		func (f MyFloat) Abs() float64 {
			if f < 0 {
				return float64(-f)
			}
			return float64(f)
		}
		type Vertex struct {
			X,Y float64
		}
		func (v *Vertex) Abs() float64{
			return math.Sqrt(v.X*v.X+v.Y*v.Y)
		}
	错误（error）：error是一个内建接口
		type error interface {
			Error() string
		}
	Reader接口：io.Reader，表示从数据流的末尾进行读取
		Go标准库包含了该接口的许多实现，包括文件、网络连接、压缩加密等等
	Image接口：
	Go程（goroutine）：由go运行时管理的轻量级线程
		go f(x, y, z)启动一个新的Go程并执行
		f(x, y, z)
		f,x,y,z值计算发生在当前Go程中；f的执行在新的Go程
		Go 程在相同的地址空间中运行，因此在访问共享的内存时必须进行同步
		sync 包提供了这种能力，不过在 Go 中并不经常用到，因为还有其它的办法
	信道：信道是带有类型的管道，你可以通过它用信道操作符<-来发送或者接收值
		ch <- v // 将v发送至信道ch
		v := <- ch // 从ch信道接收值并赋给v，箭头是数据流动方向
		和映射、切片一样，信道在使用前必须创建：
		ch := make(chan int)
		默认情况下，发送和接收操作在另一端准备好之前都会阻塞。这使得 Go 程可以在没有显式的锁或竞态变量的情况下进行同步。
		信道可以是 带缓冲的。仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。
		
		close
			发送者通过close关闭信道
			接收者通过接收表达式分配第二个参数测试信道是否被关闭
			v,ok := <- ch
			for i := range c
			只有发送者才能关闭信道，而接收者不能
			信道与文件不同，通常情况下无需关闭它们。只有在必须告诉接收者不再有需要发送的值时才有必要关闭，例如终止一个 range 循环

		select
			select 语句使一个 Go 程可以等待多个通信操作
			select 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。
		互斥（mutual*exclusion）：信道非常适合在各个 Go 程间进行通信。如果不需要通信，只需要保证每次只有一个Go程能够访问一个共享的变量，从而避免冲突
		互斥锁（Mutex）：这一数据结构提供这种机制
		Go标准库提供了sync.Mutex提供了两个方法：Lock和Unlock

*/ 
package main
// import (
// 	"fmt"
// 	"math"
// 	"math/rand"
// )
import "fmt"

func main() {
	c := make(chan int)
	fmt.Println("main begin go程")
	go func() {
		fmt.Println("go程 running")
		c <- 1 // 发送信号
		fmt.Println("go程 信号已经发出")
	}()
	fmt.Println("main 获取信道之前的逻辑执行")
	fmt.Println("main 获取信道语句之前的打印")
	data := <- c // 接收者在接收到数据前会一直阻塞。若信道是不带缓冲的，那么接收者收到数据前，发送者会一直阻塞
	fmt.Println("main 获取信道语句之后的打印", data)
	fmt.Println("main end")
}