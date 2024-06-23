locals {
  common_tags = {
      owner = "Taas"
      usage = "Taas App"
  }
  vpc_name       = "taas-vpc"
  vpc_cidr_block = "10.10.0.0/16"
  public_subnets = ["10.10.0.0/20", "10.10.16.0/20"]
  ami = "ami-059e947d432df0a03"
}