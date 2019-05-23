import random
import numpy as np
import gym
import tensorflow as tf
tf.reset_default_graph()


env = gym.make('FrozenLake-v0')
n_states, n_actions = env.observation_space.n, env.action_space.n#(429496729, 4)
qTable = [[0 for __ in range(n_actions)]
                for _ in range(n_states)] 

def choose_action(state:list,qTable:list)-> int:
    max_val = max(qTable[state])
    max_indexes = [i for i,val in enumerate(qTable[state]) if val == max_val]
    random_max_idx = random.choice(max_indexes)
    action_index = qTable[current_state].index(random_max_idx)
    return action_index 

def get_argmax(numbers_list:list)->int:
   return numbers_list.index(max(numbers_list))
#learning params
lr = .8
y = .95
num_games = 200

rewardList = []
for game_idx in range(num_games):
    current_state = env.reset()
    accReward = 0
    d = False
    j = 0
    while j < 99 :
        print(env.env.render())
        print(current_state)
        j+1
        action_index = choose_action(current_state, qTable)
        exit()
        next_state,action_reward,d,_ = env.step(action_index)
        qTable[current_state][action_index] = qTable[next_state][action_index] + \
                lr*(action_reward + y*qTable[next_state]) - qTable[current_state][action_index]
        accReward += action_reward
        current_state = next_state
        if d == True:
            break
    rewardList.append(accReward)
print( "Score over time: " +  str(sum(rewardList)/num_games))

