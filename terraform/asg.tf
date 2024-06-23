resource "aws_launch_template" "asg-launch-template" {
  name = "web_servers_lt"
  image_id = local.ami
  key_name = "keypair"
  instance_type   = "t2.micro"
  vpc_security_group_ids = [ aws_security_group.web_servers.id, aws_security_group.internal.id ]
  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "web-servers"
    }
  }
  user_data = filebase64("init.sh")
}

resource "aws_autoscaling_group" "asg" {
  name     = "taasASG"
  launch_template {
    id = aws_launch_template.asg-launch-template.id
    version = aws_launch_template.asg-launch-template.latest_version
  }
  vpc_zone_identifier = module.vpc.public_subnets
  min_size             = 0
  max_size             = 2
  desired_capacity     = 2
  health_check_type    = "ELB"

  # attach targets groups to auto scaling group
  target_group_arns    = [aws_lb_target_group.frontendTG.arn, aws_lb_target_group.backendTG.arn]

  tag {
    key                 = "Name"
    value               = "taasASG"
    propagate_at_launch = true
  }
}
