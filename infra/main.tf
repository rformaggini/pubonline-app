resource "aws_vpc" "pubonline-app-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    "name" = "pubonline-app-vpc"
  }
}

resource "aws_subnet" "pubonline-app-subnet" {
  vpc_id = "${aws_vpc.pubonline-app-vpc.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    "name" = "pubonline-app-subnet-pub"
  }
}

resource "aws_internet_gateway" "pubonline-app-gateway" {
  vpc_id = "${aws_vpc.pubonline-app-vpc.id}"
  tags = {
    "name" = "pubonline-app-gateway"
  }
}

resource "aws_route_table" "pubonline-app-route-table" {
  vpc_id = "${aws_vpc.pubonline-app-vpc.id}"
  tags = {
    "name" = "pubonline-app-route-table"
  }
}

resource "aws_route" "pubonline-app-route" {
  route_table_id = "${aws_route_table.pubonline-app-route-table.id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = "${aws_internet_gateway.pubonline-app-gateway.id}"
}

resource "aws_route_table_association" "pubonline-app-route-table-assoc" {
  route_table_id = "${aws_route_table.pubonline-app-route-table.id}"
  subnet_id = "${aws_subnet.pubonline-app-subnet.id}"
}

resource "aws_instance" "pubonline-app-ec2" {
  instance_type = "t2.micro"
  key_name = "${aws_key_pair.pubonline-app-key.id}"
  vpc_security_group_ids = [aws_security_group.pubonline-app-sg.id]
  subnet_id = "${aws_subnet.pubonline-app-subnet.id}"

  ami = "${data.aws_ami.pubonline-app-ami.id}"

  user_data = file("userdata.tpl")

  root_block_device {
    volume_size = 8
  }

  tags = {
    "name" = "pubonline-app-ec2"
  }
}