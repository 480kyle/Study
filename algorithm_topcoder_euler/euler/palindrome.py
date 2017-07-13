def palidrome():
    max = 0
    for i in range(100, 1000):
        for j in range(i, 1000):
            num = str(i * j)
            if(num == num[::-1]):
                if(max < num):
                    max = num
    print(max)
    
palidrome()