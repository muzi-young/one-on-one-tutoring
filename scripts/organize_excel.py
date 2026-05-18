#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import sys
import os

def organize_excel_file(input_file, output_file):
    """
    读取Excel文件并按照指定列进行整理：端口、板块、功能点、详细功能描述、功能逻辑
    """
    try:
        # 读取Excel文件
        df = pd.read_excel(input_file)
        
        print(f"原始文件列名: {list(df.columns)}")
        print(f"数据行数: {len(df)}")
        
        # 检查是否有需要的列
        required_columns = ['端口', '板块', '功能点', '详细功能描述', '功能逻辑']
        existing_columns = list(df.columns)
        
        # 如果列名不完全匹配，尝试匹配相似的列名
        column_mapping = {}
        for req_col in required_columns:
            found = False
            for existing_col in existing_columns:
                if req_col in existing_col or existing_col in req_col:
                    column_mapping[req_col] = existing_col
                    found = True
                    break
            if not found:
                print(f"警告: 未找到列 '{req_col}'")
        
        # 创建新的DataFrame，只包含需要的列
        organized_df = pd.DataFrame()
        
        for req_col in required_columns:
            if req_col in column_mapping:
                organized_df[req_col] = df[column_mapping[req_col]]
            elif req_col in existing_columns:
                organized_df[req_col] = df[req_col]
            else:
                # 如果找不到对应的列，创建空列
                organized_df[req_col] = ''
        
        # 保存整理后的文件
        organized_df.to_excel(output_file, index=False, engine='openpyxl')
        
        print(f"\n整理完成！输出文件: {output_file}")
        print(f"整理后的列名: {list(organized_df.columns)}")
        
        # 显示前几行数据
        print("\n前5行数据预览:")
        print(organized_df.head().to_string())
        
        return True
        
    except Exception as e:
        print(f"处理文件时出错: {str(e)}")
        return False

if __name__ == "__main__":
    input_file = "/Users/liyan/Desktop/轮训期间内容/5 月份项目/陪护住宿陪同+陪诊/乌兹别克斯坦教育数字化平台-功能清单.xlsx"
    output_file = "/Users/liyan/Desktop/4月份项目/我的 AI 项目/乌兹别克斯坦教育数字化平台-功能清单-整理版.xlsx"
    
    if os.path.exists(input_file):
        organize_excel_file(input_file, output_file)
    else:
        print(f"输入文件不存在: {input_file}")
