import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

type GeneratorId = 'g-wing' | 'nekketsu-robo' | 'yasuke' | 'marunouchi' | 'eigo-kyokasho';

interface Props {
  onSelect: (id: GeneratorId) => void;
}

const GENERATORS = [
  {
    id: 'g-wing' as GeneratorId,
    title: 'G-WING',
    subtitle: 'LYRIC GENERATOR',
    desc: '90年代ロボットアニメ風\nHi-NRGユーロビート歌詞',
    accent: '#00ff41',
    bg: 'rgba(0,255,65,0.08)',
    border: 'rgba(0,255,65,0.3)',
    tag: 'TWO-MIX / 高山みなみ風',
  },
  {
    id: 'nekketsu-robo' as GeneratorId,
    title: '熱血ROBO',
    subtitle: 'LYRIC GENERATOR',
    desc: '80〜90年代熱血スーパーロボット\nアニメ主題歌風歌詞',
    accent: '#ff2222',
    bg: 'rgba(255,34,34,0.08)',
    border: 'rgba(255,34,34,0.3)',
    tag: '勇者シリーズ / 超合金プロトコル',
  },
  {
    id: 'yasuke' as GeneratorId,
    title: 'YASUKE',
    subtitle: 'SAMURAI SONG',
    desc: 'イニシャルD風ユーロビート×戦国\n黒き侍ヤスケの伝説を刻め',
    accent: '#d4af37',
    bg: 'rgba(212,175,55,0.08)',
    border: 'rgba(212,175,55,0.3)',
    tag: '戦国ユーロビートプロトコル',
  },
  {
    id: 'marunouchi' as GeneratorId,
    title: '◯の内っぽ',
    subtitle: 'ティックジェネレーター',
    desc: '丸の内的シティポップ×椎名林檎風\n日常の断片を歌詞に変換',
    accent: '#00ff41',
    bg: 'rgba(0,255,65,0.08)',
    border: 'rgba(0,229,255,0.3)',
    tag: 'TOKYO CITY POP SYS',
  },
  {
    id: 'eigo-kyokasho' as GeneratorId,
    title: '英語教科書',
    subtitle: 'LYRIC GENERATOR',
    desc: '小中学校で習う英単語＆英文で歌う\n"I have a pen." を歌詞に変換せよ',
    accent: '#5bc8f5',
    bg: 'rgba(91,200,245,0.08)',
    border: 'rgba(91,200,245,0.3)',
    tag: 'SCHOOL ENGLISH PROTOCOL',
  },
];

export default function HubScreen({ onSelect }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.systemLine}>/// SYSTEM ONLINE — LYRIC STUDIO ///</Text>

      <View style={styles.titleBlock}>
        <Text style={styles.mainTitle}>作詞スタジオ</Text>
        <Text style={styles.mainTitleSub}>LYRIC GENERATOR HUB</Text>
      </View>

      <Text style={styles.version}>VER. 1.0  //  MULTI-GENERATOR PLATFORM</Text>

      <Text style={styles.selectLabel}>// SELECT GENERATOR //</Text>

      {GENERATORS.map((gen) => (
        <TouchableOpacity
          key={gen.id}
          style={[styles.card, { borderColor: gen.border, backgroundColor: gen.bg }]}
          onPress={() => onSelect(gen.id)}
          activeOpacity={0.75}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: gen.accent }]}>{gen.title}</Text>
              <Text style={[styles.cardSubtitle, { color: gen.accent, opacity: 0.7 }]}>
                {gen.subtitle}
              </Text>
            </View>
            <Text style={[styles.cardArrow, { color: gen.accent }]}>▶</Text>
          </View>
          <Text style={styles.cardDesc}>{gen.desc}</Text>
          <Text style={[styles.cardTag, { color: gen.accent, opacity: 0.5 }]}>{gen.tag}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.footer}>POWERED BY LYRIC GENERATOR HUB</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080810' },
  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: 'center',
  },
  systemLine: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#00cc33',
    letterSpacing: 2,
    marginBottom: 24,
  },
  titleBlock: { alignItems: 'center', marginBottom: 6 },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    color: '#00ff41',
    textShadowColor: '#00ff41',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  mainTitleSub: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#00e5ff',
    marginTop: 2,
  },
  version: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#555',
    letterSpacing: 2,
    marginBottom: 32,
    marginTop: 4,
  },
  selectLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#00cc33',
    letterSpacing: 2,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 18,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
  },
  cardSubtitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 20,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 22,
    color: '#888',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cardTag: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
  },
  footer: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: '#333',
    letterSpacing: 2,
    marginTop: 16,
  },
});
