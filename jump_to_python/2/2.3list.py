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
a = [1, 2, 3, 4, 5]
print(a[0:2])

a = "12345"
print(a[0:2])

a = [1,2,3,4,5]
b = a[:2]
c = a[2:]
print(b, c)

# 중첩된 리스트에서 슬라이싱
a = [1, 2, 3, ['a', 'b', 'c'], 4, 5]
print(a[2:5])
a[3][:2]

# 리스트 연산자

# 리스트 더하기
a = [1, 2, 3]
b = [4, 5, 6]
print(a + b)

# 리스트 반복하기
a = [1, 2, 3]
print(a * 3)

a = [1, 2, 3]
print(str(a[2]) + "hi")

# 리스트의 수정, 변경, 삭제

# 리스트에서 하나의 값 수정
a = [1, 2, 3]
a[2] = 4
print(a)

# 리스트에서 연속된 범위의 값 수정
print(a[1:2])
a[1:2] = ['a', 'b', 'c']
print(a)

# a[1]을 수정하는 것과 a[1:2]를 수정하는 것은 다르다.
a = [1, 2, 3]
a[1] = ['a', 'b', 'c']
print(a)

# [] 사용해 리스트 요소 삭제하기
a = [1, 'a', 'b', 'c', 4]
a[1:3] = []
print(a)

# del 함수 사용해 리스트 요소 삭제하기
print(a)
del a[1]
print(a)
del a[0:]
print(a)

# 리스트 관련 함수들

# 리스트에 요소 추가(append)
a = [1, 2, 3]
a.append(4)
print(a)
a.append([5, 6])
print(a)

# 리스트 정렬(sort)
a = ['a', 'c', 'b']
a.reverse()
print(a)

# 위치반환(index)
a = [1, 2, 3]
a.index(3)
a.index(1)
# a.index(0) # 에러

# 리스트에 요소 삽입(insert)
a = [1, 2, 3]
a.insert(0, 4)
print(a)
a.insert(3, 5)
print(a)

# 리스트 요소 제거(remove)
a = [1, 2, 3, 1, 2, 3]
a.remove(3)
print(a)
a.remove(3)
print(a)

# 리스트 요소 끄집어내기(pop)
a = [1, 2, 3]
a.pop()
print(a)
a = [1, 2, 3]
a.pop(1)
print(a)

# 리스트에 포한된 요소 x의 개수 세기(count)
a = [1, 2, 3, 1]
print(a.count(1))

# 리스트 확장(extend)
a = [1, 2, 3]
a.extend([4, 5]) # a += [4, 5], a = a + [4, 5]
print(a)
b = [6, 7]
a.extend(b)
print(a)