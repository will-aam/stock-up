-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_produto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "saldo_estoque" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "codigos_de_barras" (
    "codigo_de_barras" TEXT NOT NULL PRIMARY KEY,
    "produto_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "codigos_de_barras_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "data_contagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "local_estoque" TEXT NOT NULL DEFAULT 'loja-1',
    "status" TEXT NOT NULL DEFAULT 'em_andamento',
    "observacoes" TEXT,
    CONSTRAINT "contagens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "itens_contados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contagem_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "codigo_de_barras" TEXT NOT NULL,
    "quantidade_contada" INTEGER NOT NULL,
    "saldo_estoque" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "data_hora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "itens_contados_contagem_id_fkey" FOREIGN KEY ("contagem_id") REFERENCES "contagens" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "itens_contados_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "itens_contados_codigo_de_barras_fkey" FOREIGN KEY ("codigo_de_barras") REFERENCES "codigos_de_barras" ("codigo_de_barras") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_codigo_produto_key" ON "produtos"("codigo_produto");
