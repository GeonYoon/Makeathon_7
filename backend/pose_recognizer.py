#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
This program creates a Number-Recognizer.

Author: Taemin Choi
Email: choitm0707@kist.re.kr
Last edited: November 2018
"""
def read_in():
    lines = sys.stdin.readlines()
    return lines[0]

import os
import numpy as np
import tensorflow as tf
from PIL import Image, ImageFilter
from collections import Counter
import random

class PoseRecognizer(object):
    """

    """
    def __init__(self, image_path_):

        self.image_path = image_path_
        self.image_input = []
        self.preprocess_image()
        self.prediction()

    def preprocess_image(self):
        # 예측용 이미지 데이터 처리
        image_input = []

        path = self.image_path + '/'
        image_list = os.listdir(path)
        print("이미지 리스트", image_list)
        self.image_list = image_list

        for image in image_list:
            image_path = os.path.join(path, image)
            gray_image = Image.open(image_path).convert('L')
            blur_image = gray_image.filter(ImageFilter.GaussianBlur(radius=5))
            resized_image = Image.Image.resize(blur_image, (40, 40))
            image_input.append(np.array(resized_image))

        image_input = np.reshape(image_input, (-1, 1600))
        self.image_input = image_input
        print("입력된 이미지 = ", self.image_input.shape)

    def prediction(self):
        tf.reset_default_graph()

        # dropout (keep_prob) rate  0.7 on training, but should be 1 for testing
        keep_prob = tf.placeholder(tf.float32)

        # input place holders
        X = tf.placeholder(tf.float32, [None, 1600])
        X_img = tf.reshape(X, [-1, 40, 40, 1])  # img 40x40x1 (black/white)

        # L1 ImgIn shape=(?, 40, 40, 1)
        W1 = tf.Variable(tf.random_normal([3, 3, 1, 32], stddev=0.01))
        #    Conv     -> (?, 40, 40, 32)
        #    Pool     -> (?, 20, 20, 32)
        L1 = tf.nn.conv2d(X_img, W1, strides=[1, 1, 1, 1], padding='SAME')
        L1 = tf.nn.relu(L1)
        L1 = tf.nn.max_pool(L1, ksize=[1, 2, 2, 1],
                            strides=[1, 2, 2, 1], padding='SAME')
        L1 = tf.nn.dropout(L1, keep_prob=keep_prob)
        '''
        Tensor("Conv2D:0", shape=(?, 28, 28, 32), dtype=float32)
        Tensor("Relu:0", shape=(?, 28, 28, 32), dtype=float32)
        Tensor("MaxPool:0", shape=(?, 14, 14, 32), dtype=float32)
        Tensor("dropout/mul:0", shape=(?, 14, 14, 32), dtype=float32)
        '''

        # L2 ImgIn shape=(?, 20, 20, 32)
        W2 = tf.Variable(tf.random_normal([3, 3, 32, 64], stddev=0.01))
        #    Conv      ->(?, 20, 20, 64)
        #    Pool      ->(?, 10, 10, 64)
        L2 = tf.nn.conv2d(L1, W2, strides=[1, 1, 1, 1], padding='SAME')
        L2 = tf.nn.relu(L2)
        L2 = tf.nn.max_pool(L2, ksize=[1, 2, 2, 1],
                            strides=[1, 2, 2, 1], padding='SAME')
        L2 = tf.nn.dropout(L2, keep_prob=keep_prob)
        '''
        Tensor("Conv2D_1:0", shape=(?, 14, 14, 64), dtype=float32)
        Tensor("Relu_1:0", shape=(?, 14, 14, 64), dtype=float32)
        Tensor("MaxPool_1:0", shape=(?, 7, 7, 64), dtype=float32)
        Tensor("dropout_1/mul:0", shape=(?, 7, 7, 64), dtype=float32)
        '''

        # L3 ImgIn shape=(?, 10, 10, 64)
        W3 = tf.Variable(tf.random_normal([3, 3, 64, 128], stddev=0.01))
        #    Conv      ->(?, 10, 10, 128)
        #    Pool      ->(?, 5, 5, 128)
        #    Reshape   ->(?, 5 * 5 * 128) # Flatten them for FC
        L3 = tf.nn.conv2d(L2, W3, strides=[1, 1, 1, 1], padding='SAME')
        L3 = tf.nn.relu(L3)
        L3 = tf.nn.max_pool(L3, ksize=[1, 2, 2, 1], strides=[
            1, 2, 2, 1], padding='SAME')
        L3 = tf.nn.dropout(L3, keep_prob=keep_prob)
        L3_flat = tf.reshape(L3, [-1, 128 * 5 * 5])
        '''
        Tensor("Conv2D_2:0", shape=(?, 7, 7, 128), dtype=float32)
        Tensor("Relu_2:0", shape=(?, 7, 7, 128), dtype=float32)
        Tensor("MaxPool_2:0", shape=(?, 4, 4, 128), dtype=float32)
        Tensor("dropout_2/mul:0", shape=(?, 4, 4, 128), dtype=float32)
        Tensor("Reshape_1:0", shape=(?, 2048), dtype=float32)
        '''

        # L4 FC 4x4x128 inputs -> 625 outputs
        W4 = tf.get_variable("W4", shape=[128 * 5 * 5, 625],
                             initializer=tf.contrib.layers.xavier_initializer())
        b4 = tf.Variable(tf.random_normal([625]))
        L4 = tf.nn.relu(tf.matmul(L3_flat, W4) + b4)
        L4 = tf.nn.dropout(L4, keep_prob=keep_prob)
        '''
        Tensor("Relu_3:0", shape=(?, 625), dtype=float32)
        Tensor("dropout_3/mul:0", shape=(?, 625), dtype=float32)
        '''

        # L5 Final FC 625 inputs -> 10 outputs
        W5 = tf.get_variable("W5", shape=[625, 3],
                             initializer=tf.contrib.layers.xavier_initializer())
        b5 = tf.Variable(tf.random_normal([3]))
        logits = tf.matmul(L4, W5) + b5
        #
        with tf.Session() as sess:
            save_path = './models/recognizer_pose_model'
            new_saver = tf.train.Saver()
            new_saver.restore(sess, save_path)

            result = []

            for i in range(len(self.image_input)):
                feed_dict = {X: self.image_input[i].reshape(1, 1600), keep_prob: 1.0}
                predict_result = sess.run(logits, feed_dict=feed_dict)
                number = np.where(predict_result[0] == np.max(predict_result[0]))
                # print(number[0][0])
                result.append(number)

            # for i in range(result)
            result_list = []
            for i in range(len(result)):
                a = int(result[i][0][0])
                result_list.append(a)
            count = Counter(result_list)
            most_common = count.most_common(1)
            common_pose = most_common[0][0]
            index = result_list.index(common_pose)
            # print("list = ", result_list)

            index_list = []

            for index, value in enumerate(result_list):
                if value == common_pose:
                    index_list.append(index)

            sample = random.sample(index_list, 5)

            suggest_image = []

            for i in range(len(sample)):
                image = self.image_list[i]
                path = self.image_path + '/'
                path = os.path.join(path + image)
                suggest_image.append(path)

            print(suggest_image)
            return suggest_image

if __name__ == '__main__':
    IMAGE_DIR = read_in()
    pose_recognizer = PoseRecognizer(IMAGE_DIR)