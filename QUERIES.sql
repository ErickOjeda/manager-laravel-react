-- Script para buscar todos os responsáveis que podem atender um cliente específico

SELECT r.*
FROM responsibles r
JOIN clients c ON r.city_id = c.city_id
WHERE c.id = {{id_cliente}};

-- Script para buscar todos os responsáveis de uma cidade específica 

SELECT *
FROM responsibles
WHERE city_id = {{id_cidade}};