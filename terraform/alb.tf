resource "aws_lb" "taas_alb" {
  name               = "taasALB"
  internal           = false
  security_groups    = [ aws_security_group.web_server-lb.id, aws_security_group.internal.id ]
  load_balancer_type = "application"
  subnets = module.vpc.public_subnets
}

resource "aws_lb_target_group" "frontendTG" {
  name        = "frontend"
  target_type = "instance"
  port        = "3000"
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id

  health_check {
    path     = "/"
    protocol = "HTTP"
    matcher  = "200"
    interval = 6
    healthy_threshold = 2
    unhealthy_threshold = 2
    timeout = 5
  }

  tags = {
    Name = "frontendTG"
  }
}

resource "aws_lb_target_group" "backendTG" {
  name        = "backend"
  target_type = "instance"
  port        = "3010"
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id

  health_check {
    path     = "/health"
    protocol = "HTTP"
    matcher  = "200"
    interval = 6
    healthy_threshold = 2
    unhealthy_threshold = 2
    timeout = 5
  }

  tags = {
    Name = "backendTG"
  }
}

resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.taas_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontendTG.arn
  }
}

resource "aws_alb_listener_rule" "backend_rule" {
  listener_arn = aws_lb_listener.frontend.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backendTG.arn
  }

  condition {
    path_pattern {
      values = ["/tukis/*"]
    }
  }
}

output "elb_dns_name" {
  value       = aws_lb.taas_alb.dns_name
  description = "The domain name of the load balancer"
}