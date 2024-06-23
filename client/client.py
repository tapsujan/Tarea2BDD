import requests

API_URL = "http://localhost:3000/api"

def login():
    correo = input("Ingrese su correo electrónico: ")
    clave = input("Ingrese su clave: ")
    
    response = requests.post(f"{API_URL}/login", json={"correo": correo, "clave": clave})
    
    if response.status_code == 200:
        print("Inicio de sesión exitoso")
        return True, correo, clave
    else:
        print("Error en inicio de sesión")
        return False, None, None

def menu():
    print("Menú de opciones:")
    print("1. Registrar usuario")
    print("2. Bloquear usuario")
    print("3. Obtener información de usuario")
    print("4. Marcar correo como favorito")
    print("5. Desmarcar correo como favorito")
    print("6. Terminar")

def register_user():
    nombre = input("Ingrese el nombre del usuario: ")
    correo = input("Ingrese el correo electrónico: ")
    clave = input("Ingrese la clave: ")
    descripcion = input("Ingrese una descripción: ")

    response = requests.post(f"{API_URL}/registrar", json={
        "nombre": nombre,
        "correo": correo,
        "clave": clave,
        "descripcion": descripcion
    })
    if response.status_code == 200:
        print("Usuario registrado correctamente")
    else:
        print("Error al registrar el usuario")

def block_user(correo, clave):
    correo_bloquear = input("Ingrese el correo del usuario a bloquear: ")

    response = requests.post(f"{API_URL}/bloquear", json={
        "correo": correo,
        "clave": clave,
        "correo_bloquear": correo_bloquear
    })
    
    if response.status_code == 200:
        print("Usuario bloqueado correctamente")
    else:
        print("Error al bloquear el usuario")

def view_user_info():
    correo_usuario = input("Ingrese el correo del usuario: ")
    
    response = requests.get(f"{API_URL}/informacion/{correo_usuario}")
    
    if response.status_code == 200:
        print("Información del usuario:", response.json())
    else:
        print("Error al obtener la información del usuario")

def mark_favorite(correo, clave):
    id_correo = input("Ingrese el ID del correo a marcar como favorito: ")
    
    response = requests.post(f"{API_URL}/marcarcorreo", json={
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": id_correo
    })
    
    if response.status_code == 200:
        print("Correo marcado como favorito correctamente")
    else:
        print("Error al marcar el correo como favorito")

def unmark_favorite(correo, clave):
    id_correo = input("Ingrese el ID del correo a desmarcar como favorito: ")
    
    response = requests.delete(f"{API_URL}/desmarcarcorreo", json={
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": id_correo
    })
    
    if response.status_code == 200:
        print("Correo desmarcado como favorito correctamente")
    else:
        print("Error al desmarcar el correo como favorito")

def main():
    logged_in, correo, clave = login()
    if not logged_in:
        return

    while True:
        menu()
        opcion = input("Seleccione una opción: ")
        
        if opcion == "1":
            register_user()
        elif opcion == "2":
            block_user(correo, clave)
        elif opcion == "3":
            view_user_info()
        elif opcion == "4":
            mark_favorite(correo, clave)
        elif opcion == "5":
            unmark_favorite(correo, clave)
        elif opcion == "6":
            print("Terminando ejecución del cliente")
            break
        else:
            print("Opción no válida, por favor intente de nuevo")

if __name__ == "__main__":
    main()
