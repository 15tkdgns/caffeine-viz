#!/usr/bin/env python3
"""
Caffeine Project - Cloud Architecture Diagrams
Uses the 'diagrams' library to generate professional cloud architecture diagrams.
"""

from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import ECS
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB
from diagrams.onprem.client import Users
from diagrams.onprem.compute import Server
from diagrams.onprem.container import Docker
from diagrams.onprem.database import PostgreSQL
from diagrams.aws.network import ALB
from diagrams.onprem.mlops import Mlflow
from diagrams.programming.framework import FastAPI, React
from diagrams.saas.chat import Slack
from diagrams.generic.compute import Rack
from diagrams.custom import Custom
import os

# Output directory
OUTPUT_DIR = "/root/caffeine/viz-flow/public/diagrams"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Overall Architecture
with Diagram("Caffeine Architecture", filename=f"{OUTPUT_DIR}/caffeine_architecture", show=False, direction="TB"):
    users = Users("Users")
    
    with Cluster("Frontend"):
        user_app = React("User App\n(React Native)")
        admin_app = React("Admin App\n(Next.js)")
    
    with Cluster("Gateway"):
        alb = ALB("Application Load Balancer\nAWS ALB")
    
    with Cluster("Backend"):
        api = FastAPI("FastAPI\nPython 3.10")
    
    with Cluster("ML Services"):
        ml_next = Mlflow("ML Next\nXGBoost")
        ml_fraud = Mlflow("ML Fraud\nAnomaly")
    
    with Cluster("LLM Services"):
        llm = Rack("Gemini 2.0\nFlash")
    
    with Cluster("Database"):
        db = PostgreSQL("PostgreSQL\nAWS RDS")
    
    users >> user_app >> alb
    users >> admin_app >> alb
    alb >> api
    api >> ml_next
    api >> ml_fraud
    api >> llm
    api >> db

print(f"✅ Generated: {OUTPUT_DIR}/caffeine_architecture.png")


# 2. Deployment Architecture
with Diagram("Caffeine Deployment", filename=f"{OUTPUT_DIR}/caffeine_deployment", show=False, direction="LR"):
    
    with Cluster("Development"):
        github = Server("GitHub")
        docker_local = Docker("Docker Compose")
    
    with Cluster("AWS Cloud"):
        ecr = Docker("AWS ECR")
        ecs = ECS("AWS ECS")
        rds = RDS("AWS RDS")
    
    with Cluster("External Services"):
        gemini = Rack("Google\nGemini API")
        gmail = Slack("Gmail SMTP")
    
    github >> docker_local
    github >> ecr >> ecs
    ecs >> rds
    ecs >> gemini
    ecs >> gmail

print(f"✅ Generated: {OUTPUT_DIR}/caffeine_deployment.png")


# 3. ML Pipeline
with Diagram("Caffeine ML Pipeline", filename=f"{OUTPUT_DIR}/caffeine_ml_pipeline", show=False, direction="LR"):
    
    with Cluster("Input"):
        input_data = Server("Transaction\nData")
    
    with Cluster("Feature Engineering"):
        feat_amount = Rack("금액 범위")
        feat_time = Rack("시간대")
        feat_day = Rack("요일")
        feat_text = Rack("텍스트 특징")
    
    with Cluster("Model"):
        xgboost = Mlflow("XGBoost\nClassifier")
    
    with Cluster("Output"):
        category = Server("카테고리\n(15개)")
        probability = Server("확률 점수")
    
    input_data >> [feat_amount, feat_time, feat_day, feat_text]
    [feat_amount, feat_time, feat_day, feat_text] >> xgboost
    xgboost >> [category, probability]

print(f"✅ Generated: {OUTPUT_DIR}/caffeine_ml_pipeline.png")


# 4. Data Flow
with Diagram("Caffeine Data Flow", filename=f"{OUTPUT_DIR}/caffeine_data_flow", show=False, direction="TB"):
    
    with Cluster("Client Layer"):
        user = Users("사용자")
        app = React("Mobile App")
    
    with Cluster("API Layer"):
        api = FastAPI("FastAPI")
    
    with Cluster("Processing"):
        ml = Mlflow("ML Service")
        llm = Rack("LLM Service")
    
    with Cluster("Storage"):
        db = PostgreSQL("PostgreSQL")
    
    user >> Edge(label="요청") >> app
    app >> Edge(label="API Call") >> api
    api >> Edge(label="예측") >> ml
    api >> Edge(label="분석") >> llm
    api >> Edge(label="저장") >> db
    db >> Edge(label="응답") >> api
    api >> Edge(label="결과") >> app
    app >> Edge(label="표시") >> user

print(f"✅ Generated: {OUTPUT_DIR}/caffeine_data_flow.png")

print("\n🎉 All diagrams generated successfully!")
print(f"📁 Output directory: {OUTPUT_DIR}")
