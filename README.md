# Morfeus IA Integration Frontend
### Trabalho da cadeira de Inteligência Artifical 1

Morfeus IA é um projeto voltado para a interpretação de sonhos para a área da psicologia.
Ao prover um sonho, Morfeus utiliza-se de uma integração com a API do Gemini para obter um interpretação baseada nos estudos da psicanálise e ontopsicologia, assim como gera uma imagem descritiva do relato onírico.

## Descrição do Projeto

Morfeus IA Integration Frontend é o projeto frontend (interface gráfica) de Morfeus IA, foi desenvolvido em TypeScript com React, utilizando-se do framework do React, NextJS.

## Instalação / Execução

É possível instalar e executar esse projeto localmente em uma máquina ou através de um container Docker.

### Localmente

Requisitos:
- Node >= 20.12;
- Yarn >= 1.22.0.

Instalação:
1. `yarn` - instala as dependências;
2. `yarn dev` - inicializa o projeto.

### Docker

Requisitos:
- Docker >= 28

Instalação:
Execute `docker compose up` ou `docker compose up -d` na pasta raíz deste projeto.

#### Variáveis de ambiente

É necessário apenas a variável de ambiente da URL do serviço backend correspondente (NEXT_PUBLIC_BACKEND_URL).