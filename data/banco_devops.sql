-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 177.153.63.30
-- Generation Time: 04-Nov-2024 às 14:33
-- Versão do servidor: 5.7.32-35-log
-- PHP Version: 5.6.40-0+deb8u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devops_taqui`
--
CREATE DATABASE IF NOT EXISTS `devops_taqui` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci;
USE `devops_taqui`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `consumidor`
--

CREATE TABLE `consumidor` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `idade` int(11) NOT NULL,
  `profissao` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `faixa_salarial` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `possui_filhos` tinyint(1) NOT NULL,
  `trocou_carro` tinyint(1) NOT NULL,
  `viagem_anual` tinyint(1) NOT NULL,
  `smartphone_recente` tinyint(1) NOT NULL,
  `poder_compra_reduzido` tinyint(1) NOT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Extraindo dados da tabela `consumidor`
--

INSERT INTO `consumidor` (`id`, `nome`, `idade`, `profissao`, `faixa_salarial`, `possui_filhos`, `trocou_carro`, `viagem_anual`, `smartphone_recente`, `poder_compra_reduzido`, `data_criacao`) VALUES
(1, 'João da Silva', 38, 'Engenheiro', '15.000 - 20.000', 1, 1, 1, 0, 0, '2024-11-04 14:34:53'),
(2, 'Ana Oliveira', 45, 'Professora', '4.000 - 5.000', 0, 0, 0, 0, 0, '2024-11-04 14:34:53'),
(3, 'Carlos Mendes', 50, 'Advogado', '15.000 - 20.000', 0, 0, 1, 0, 0, '2024-11-04 14:34:53'),
(4, 'Mariana Souza', 35, 'Médica', '20.000+', 1, 0, 1, 0, 0, '2024-11-04 14:34:53'),
(5, 'Rafael Almeida', 28, 'Desenvolvedor', '10.000 - 15.000', 0, 0, 0, 1, 0, '2024-11-04 14:34:53');

-- --------------------------------------------------------

--
-- Estrutura da tabela `log_atividade`
--

CREATE TABLE `log_atividade` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `acao` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `descricao` text COLLATE latin1_general_ci,
  `data_hora` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_usuario` varchar(45) COLLATE latin1_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `fabricante` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `modelo` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `bateria` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `camera` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `processador` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `tamanho_tela` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `qualidade_tela` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `capacidade_armazenamento` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `memoria_ram` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `imagem_url` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id`, `nome`, `fabricante`, `modelo`, `bateria`, `camera`, `processador`, `tamanho_tela`, `qualidade_tela`, `capacidade_armazenamento`, `memoria_ram`, `preco`, `imagem_url`, `tags`, `data_criacao`) VALUES
(1, 'iPhone 15 Pro Max', 'Apple', 'iPhone 15 Pro Max', '4.323 mAh', '48 MP', 'A17 Bionic', '6.7 polegadas', 'Super Retina XDR', '512 GB', '8 GB', 9975.25, 'https://i.ibb.co/WKTH9bj/Modelo-0003-i-Phone-15-Pro-Max.png', 'premium,apple,iphone', '2024-11-04 14:35:55'),
(2, 'Samsung Galaxy S24 Ultra', 'Samsung', 'Galaxy S24 Ultra', '5.000 mAh', '200 MP', 'Snapdragon 8 Gen 3', '6.8 polegadas', 'Dynamic AMOLED 2X', '1 TB', '12 GB', 8500.00, 'https://i.ibb.co/9wWL7sd/Modelo-0007-Samsung-Galaxy-S24-Ultra.png', 'premium,samsung,galaxy', '2024-11-04 14:35:55'),
(3, 'Asus ROG Phone 7', 'Asus', 'ROG Phone 7', '6.000 mAh', '64 MP', 'Snapdragon 8 Gen 2', '6.8 polegadas', 'AMOLED', '512 GB', '16 GB', 7800.00, 'https://i.ibb.co/0sY2HYf/Modelo-0006-Asus-ROG-Phone-7.png', 'gaming,asus,rog', '2024-11-04 14:35:55'),
(4, 'Galaxy Z Fold 6', 'Samsung', 'Galaxy Z Fold 6', '4.500 mAh', '108 MP', 'Snapdragon 8 Gen 3', '7.6 polegadas', 'Foldable AMOLED', '512 GB', '12 GB', 9000.00, 'https://i.ibb.co/SV7cRzf/Modelo-0005-Samsung-Galaxy-Z-Fold-6.png', 'foldable,samsung,galaxy', '2024-11-04 14:35:55'),
(5, 'Google Pixel 8 Pro', 'Google', 'Pixel 8 Pro', '4.950 mAh', '50 MP', 'Google Tensor G2', '6.7 polegadas', 'OLED', '512 GB', '12 GB', 6999.00, 'https://i.ibb.co/ftV4d4z/Modelo-0001-Google-Pixel-8-Pro.png', 'google,pixel,photography', '2024-11-04 14:35:55'),
(6, 'Realme C55', 'Realme', 'Realme C55', '5.000 mAh', '64 MP', 'MediaTek Helio G85', '6.5 polegadas', 'IPS LCD', '256 GB', '8 GB', 1500.00, 'https://i.ibb.co/s3Qtvj3/Modelo-0004-Realme-C55.png', 'budget,realme', '2024-11-04 14:35:55'),
(7, 'Moto G73', 'Motorola', 'Moto G73', '5.000 mAh', '50 MP', 'MediaTek Helio G85', '6.5 polegadas', 'IPS LCD', '128 GB', '4 GB', 1200.00, 'https://i.ibb.co/st7RK45/Modelo-0002-Moto-G73.png', 'budget,motorola', '2024-11-04 14:35:55'),
(8, 'Samsung Galaxy A34', 'Samsung', 'Galaxy A34', '5.000 mAh', '50 MP', 'Exynos 1330', '6.6 polegadas', 'PLS LCD', '128 GB', '6 GB', 1800.00, 'https://i.ibb.co/cLFKvWd/Modelo-0008-Samsung-Galaxy-A34.png', 'midrange,samsung', '2024-11-04 14:35:55'),
(9, 'Xiaomi Redmi Note 12', 'Xiaomi', 'Redmi Note 12', '5.000 mAh', '50 MP', 'Snapdragon 680', '6.43 polegadas', 'AMOLED', '128 GB', '6 GB', 1700.00, 'https://i.ibb.co/xzpyrr9/Modelo-0009-Xiaomi-Redmi-Note-12.png', 'midrange,xiaomi', '2024-11-04 14:35:55'),
(10, 'Sony Xperia 1 V', 'Sony', 'Xperia 1 V', '4.500 mAh', '64 MP', 'Snapdragon 8 Gen 2', '6.5 polegadas', 'OLED', '512 GB', '12 GB', 6000.00, 'https://i.ibb.co/SdkhXmr/Modelo-0000-Sony-Xperia-1-V.png', 'premium,sony,photography', '2024-11-04 14:35:55');

-- --------------------------------------------------------

--
-- Estrutura da tabela `recomendacao`
--

CREATE TABLE `recomendacao` (
  `id` int(11) NOT NULL,
  `consumidor_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `data_recomendacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `motivo_recomendacao` text COLLATE latin1_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `usuario` varchar(30) COLLATE latin1_general_ci NOT NULL,
  `senha` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `usuario`, `senha`, `data_criacao`) VALUES
(1, 'Taqui Master', 'taqui', 'taqui2024', '2024-11-04 14:30:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consumidor`
--
ALTER TABLE `consumidor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_atividade`
--
ALTER TABLE `log_atividade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recomendacao`
--
ALTER TABLE `recomendacao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consumidor_id` (`consumidor_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consumidor`
--
ALTER TABLE `consumidor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `log_atividade`
--
ALTER TABLE `log_atividade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `recomendacao`
--
ALTER TABLE `recomendacao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `log_atividade`
--
ALTER TABLE `log_atividade`
  ADD CONSTRAINT `log_atividade_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `recomendacao`
--
ALTER TABLE `recomendacao`
  ADD CONSTRAINT `recomendacao_ibfk_1` FOREIGN KEY (`consumidor_id`) REFERENCES `consumidor` (`id`),
  ADD CONSTRAINT `recomendacao_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
