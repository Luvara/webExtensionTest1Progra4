export const generateMessage = (
  prompt: string,
  selectedFlow: string
): string => {
  let messageSend = "";

  if (selectedFlow === "flujo1") {
    messageSend =
      "Por favor, analiza detalladamente el siguiente código de programación: " +
      prompt +
      " sigue estos pasos: Revisa el código en busca errores. Identifica posibles mejoras en el código. Proporciona una solución para corregir cualquier error. Si no se encuentran errores, describe el código y su funcion.";
  } else {
    messageSend =
      "Por favor, analiza detalladamente el siguiente código de programación: " +
      prompt +
      " sigue estos pasos: Realiza un análisis detallado del código. Genera observaciones y sugerencias. Implementa las sugerencias y prueba el código. Documenta tus observaciones y soluciones. Proporciona retroalimentación sobre el proceso.";
  }

  return messageSend;
};
