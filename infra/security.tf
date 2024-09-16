resource "aws_security_group" "pubonline-app-sg" {
  name = "pubonline-app-sg"
  description = "Security Group for Pubonline Application"
  vpc_id = "${aws_vpc.pubonline-app-vpc.id}"
}

resource "aws_security_group_rule" "sg-rules-pub-out" {
  from_port         = 0
  protocol          = "-1"
  security_group_id = "${aws_security_group.pubonline-app-sg.id}"
  to_port           = 0
  type              = "egress"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "sg-rules-ssh-in" {
  from_port         = 22
  protocol          = "tcp"
  security_group_id = "${aws_security_group.pubonline-app-sg.id}"
  to_port           = 22
  type              = "ingress"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "sg-rules-http-in" {
  from_port         = 0
  protocol          = "-1"
  security_group_id = "${aws_security_group.pubonline-app-sg.id}"
  to_port           = 0
  type              = "ingress"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_key_pair" "pubonline-app-key" {
  key_name = "pubonline-app-key"
  public_key = file("~/.ssh/id_ed25519.pub")
}