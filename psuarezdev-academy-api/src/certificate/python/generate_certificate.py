import argparse
from PIL import Image, ImageDraw, ImageFont

def generar_certificado(imagen_path, font_path, cert_id, nombre, curso, horas, fecha, profesor):
    # Cargar la plantilla de imagen
    image = Image.open(imagen_path)

    # Crear un objeto de dibujo
    draw = ImageDraw.Draw(image)

    # Usar una fuente personalizada
    font = ImageFont.truetype(font_path, 24)

    # Escribir el primer valor
    draw.text(
        (700, 60), 
        cert_id, 
        font=ImageFont.truetype(font_path, 24), 
        fill=(152, 148, 148)
    )

    # Escribir el nombre
    draw.text(
        (90, 325), 
        nombre, 
        font=ImageFont.truetype(font_path, 28), 
        fill=(0, 0, 0)
    )

    # Escribir el nombre del curso
    draw.text(
        (90, 465), 
        curso, 
        font=ImageFont.truetype(font_path, 28), 
        fill=(0, 0, 0)
    )

    # Escribir la cantidad de horas
    draw.text(
        (84, 650), 
        horas, 
        font=ImageFont.truetype(font_path, 20), 
        fill=(0, 0, 0)
    )

    # Escribir la fecha
    draw.text(
        (437, 650),
        fecha, 
        font=ImageFont.truetype(font_path, 20), 
        fill=(0, 0, 0)
    )

    # Escribir el nombre del profesor
    draw.text(
        (810, 650), 
        profesor, 
        font=ImageFont.truetype(font_path, 20), 
        fill=(0, 0, 0)
    )

    # Guardar la imagen generada
    image.save('python/certificate.png')

if __name__ == '__main__':
    # Configuración de los parámetros de la línea de comandos
    parser = argparse.ArgumentParser(description='Generar un certificado en base a una plantilla.')
    
    parser.add_argument('cert_id', help='Id del certificado')
    parser.add_argument('nombre', help='Nombre del estudiante')
    parser.add_argument('curso', help='Nombre del curso')
    parser.add_argument('horas', help='Número de horas del curso')
    parser.add_argument('fecha', help='Fecha en la que se emite el certificado')
    parser.add_argument('profesor', help='Nombre del profesor del curso')
    
    # Parsear los argumentos de la línea de comandos
    args = parser.parse_args()

    # Llamar a la función para generar el certificado
    generar_certificado(
        'python/certificate-template.png',
        'python/Onest-Regular.ttf',
        args.cert_id,
        args.nombre,
        args.curso,
        args.horas,
        args.fecha,
        args.profesor
    )
