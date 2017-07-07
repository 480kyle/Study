# 리스트 자료형

odd = [1, 3, 5, 7, 9]
print(odd)

a = []  # a = list()도 가능
b = [1, 2, 3]
c = ['Life', 'is', 'too', 'short']
d = [1, 2, 'Life', 'is']
e = [1, 2, ['Life', 'is']]
print(a, b, c, d, e)

# 리스트의 인덱싱과 슬라이싱
a = [1, 2, 3]
print(a)
print(a[0])
print(a[0] + a[2])
print(a[-1])

a = [1, 2, 3, ['a', 'b', 'c']]
print(a[0])
print(a[-1])
print(a[3])
print(a[-1][0])
print(a[-1][1])
print(a[-1][2])

a = [1, 2, ['a', 'b', ['Life', 'is']]]
print(a[2][2][0])

# 리스트 슬라이싱
