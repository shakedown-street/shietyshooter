import sys
import json


def generate_frame_list(start_x, start_y, w, h, xOff, yOff, directions, frames):
    frames_list = []
    for y in range(directions):
        for x in range(frames):
            frame = [
                x, y, start_x + (w * x),
                start_y + (h * y) + (1 * y),
                w,
                h,
                xOff,
                yOff
            ]
            frames_list.append(frame)
    return frames_list


def frame_list_to_str(frames_list):
    frames_str = []
    for f in frames_list:
        frames_str.append('\t\t\t\t{},\n'.format(f))
    return str(frames_str)


# idle walk hit attack die
heavy_armor_sword_shield = {
    "idle": {
        "duration": 100,
        "frames": generate_frame_list(0, 1045, 96, 96, 35, 80, 8, 10)
    },
    "walk": {
        "duration": 125,
        "frames": generate_frame_list(2882, 1045, 96, 96, 35, 80, 8, 8)
    },
    "hit": {
        "duration": 40,
        "frames": generate_frame_list(4420, 1045, 96, 96, 40, 80, 8, 6)
    },
    "attack": {
        "duration": 62.5,
        "frames": generate_frame_list(0, 7, 128, 128, 50, 112, 8, 16)
    },
    "die": {
        "duration": 50,
        "frames": generate_frame_list(2049, 7, 128, 96, 60, 88, 8, 20)
    },
    "magic_lightning": {
        "duration": 50,
        "frames": generate_frame_list(1921, 1827, 96, 96, 35, 80, 8, 20)
    }
}

write_to = open('dump_heavy_armor_sword_shield.json', 'w')
write_to.writelines(json.dumps(heavy_armor_sword_shield))
write_to.close()

black_knight = {
    "idle": {
        "duration": 125,
        "frames": generate_frame_list(3846, 9, 160, 128, 80, 64, 8, 8)
    },
    "walk": {
        "duration": 125,
        "frames": generate_frame_list(2563, 9, 160, 128, 80, 64, 8, 8)
    },
    "hit": {
        "duration": 62.5,
        "frames": generate_frame_list(3846, 1051, 160, 128, 80, 64, 8, 4)
    },
    "attack": {
        "duration": 62.5,
        "frames": generate_frame_list(0, 9, 160, 128, 80, 64, 8, 16)
    },
    "die": {
        "duration": 83,
        "frames": generate_frame_list(0, 1051, 160, 160, 80, 80, 8, 24)
    }
}

write_to = open('dump_black_knight.json', 'w')
write_to.writelines(json.dumps(black_knight))
write_to.close()


coins = {
    "drop": {
        "duration": 100,
        "frames": generate_frame_list(0, 3919, 96, 160, 48, 144, 1, 10)
    }
}


write_to = open('dump_coins.json', 'w')
write_to.writelines(json.dumps(coins))
write_to.close()


heavy_armor_item = {
    "drop": {
        "duration": 90,
        "frames": generate_frame_list(0, 7, 96, 160, 48, 144, 1, 15)
    }
}

write_to = open('dump_heavy_armor_item.json', 'w')
write_to.writelines(json.dumps(heavy_armor_item))
write_to.close()
