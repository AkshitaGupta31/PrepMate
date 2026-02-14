print('*'*2)
print('Python for "me"')
name="Akshita"
print(name[1:-1])
print(f"i am {name}")


class Mammal:
    def walk(self):
        print("Walk")
        
        
class Dog(Mammal):
    pass

class Cat(Mammal):
    def meow(self):
        print("meow")

dog1=Dog()
dog1.walk()
cat1=Cat()
cat1.meow()
