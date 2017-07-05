# 큰 따옴표
# "Hello World"
# 작은 따옴표
# 'Python is fun'
# 큰 따옴표 3개
# """Life is too short, You need python"""
# 작은 따옴표 3개
# '''Life is too short, You need python'''

# 문자열에 작은 따옴표 포함시키기
food = "Python's favorite food is perl"
print(food)
# 문자열에 큰 따옴표 포함시키기
say = '"Python is very easy." he says.'
print(say)

#백슬래시로 표현하기
food = 'Python\'s favorite food is perl'
say = "\"Python is very easy.\" he says."
print(food, say)

# 여러줄
multiline = "Life is too short\nYou need python"
print(multiline)

multiline = '''
Life is too short
You need python
'''
print(multiline)
multiline = """
Life is too short
You need python
"""
print(multiline)

# 문자열 더해서 연결하기
head = "Python"
tail = " is fun!"
print(head + tail)

# 문자열 곱하기
a = "python"
print(a * 2)

# 문자열 곱하기 응용
print("=" * 50)
print("My Program")
print("=" * 50)

# 문자열 인덱싱
a = "Life is too short, You need Python"
print(a[3])
print(a[0])
print(a[12])
print(a[-1])
print(a[-0]) #0과 같음
print(a[-2])
print(a[-5])

b = a[0] + a[1] + a[3] + a[4]
print(b)

# 문자열 슬라이싱
print(a[0:4])
print(a[0:5])
print(a[0:2])
print(a[5:7])
print(a[12:17])
print(a[19:])
print(a[:17])
print(a[:])
print(a[19:-7])

# 슬라이싱을 문자열 나누기
a = "20010331Rainy"
date = a[:8]
weather = a[8:]
print(date, weather)

year = a[:4]
day = a[4:8]
weather = a[8:]
print(year, day, weather)

# 요소값을 바꿀 수는 없다(immutable)
a = "Pithon"
print(a[:1] + 'y' + a[2:])

# 문자열 포매팅

# 숫자 대입
print("I eat %d apples." % 3)
# 문자 대입
print("I eat %s apples." % "five") #따옴표를 써줘야 함.

# 숫자값 변수 대입
number = 3
print("I eat %d apples." % number)

# 2개 이상의 값 대입
number = 3
day = "three"
print("I ate %d apples. so I was sick for %s days." % (number, day))

"""
%s	문자열 (String)
%c	문자 1개(character)
%d	정수 (Integer)
%f	부동소수 (floating-point)
%o	8진수
%x	16진수
%%	Literal % (문자 % 자체)
"""

# %s 포맷 코드는 어떤 형태의 값이든 변환해 넣을 수 있다.
print("I have %s apples" % 3)
print("rate is %s" % 3.234)

# %d와 %를 같이 쓸때는 %% 포맷 코드를 쓴다.
print("Error is %d%%" % 98)

# 포맷코드와 숫자 함께 사용

# 정렬과 공백
print("%10s" % "hi") #오른쪽 정렬 나머지 공백
print("%-10sjane." % "hi") #왼쪽 정렬 나머지 공백

# 소수점 표현하기
print("%0.4f" % 3.42134234) #4자리까지 표시
print("%10.4f" % 3.42134234) #4자리까지 표시, 전체길이 10개

# 문자열 관련 함수

# 문자 갯수 세기
a = "hobby"
print(a.count("b"))

# 문자 위치 알려주기1
a = "Python is best choice"
print(a.find("b"))
print(a.find("k"))

#문자 위치 알려주기2
a = "Life is too short"
print(a.index("t"))
# print(a.index("k")) # 존재하지 않으면 에러!

# 문자열 삽입
a = ","
print(a.join("abcd"))

# UPPER CASE
a = "hi"
print(a.upper())

# lower case
a = "HI"
print(a.lower())

# 왼쪽, 오른쪽, 양쪽 공백 지우기
a = " hi "
print(a.lstrip())
print(a.rstrip())
print(a.strip())

# 문자열 바꾸기
a = "Life is too short"
print(a.replace("Life", "Your leg"))

# 문자열 나누기
a = "Life is too short"
print(a.split())
a = "a:b:c:d"
print(a.split(":"))

# 고오급 문자열 포매팅

# 숫자
print("I eat {0} apples.".format(3))

# 문자
print("I eat {0} apples.".format("five"))

# 숫자 값 변수
number = 3
print("I eat {0} apples.".format(number))

# 2개 값 이상 넣기
number = 10
day = "three"
print("I ate {0} apples. so I was sick for {1} days.".format(number, day))

# 이름으로 넣기
print("I ate {number} apples. so I was sick for {day} days.".format(number=10, day=3))

# 인덱스와 이름을 혼용해서 넣기
print("I ate {0} apples. so I was sick for {day} days.".format(10, day=3))

# 왼쪽 정렬
print("{0:<10}".format("hi")) #문자열 총 자릿수 10

# 오른쪽 정렬
print("{0:>10}".format("hi"))

# 가운데 정렬
print("{0:^10}".format("hi"))

# 공백 채우기
print("{0:=^10}".format("hi"))
print("{0:!<10}".format("hi"))

# 소수점 표현하기
y = 3.42134234
print("{0:0.4f}".format(y))
print("{0:10.4f}".format(y))

# Bracket 표현하기
print("{{ and }}".format())