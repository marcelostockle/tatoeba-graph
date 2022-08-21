package lsm.tatoeba;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class Application {
    static String sentences_filepath = "./data/sentences.csv";
    static String links_filepath = "./data/links.csv";
    public static int run(int capacity, int initIndex, String output_filepath) {
        Sentence[] sentenceMap = new Sentence[capacity];

        BufferedReader reader;
        FileWriter writer;
        try {
            System.out.println("Reading links.csv...");
            reader = new BufferedReader(new FileReader(links_filepath));
            String line;
            while ((line = reader.readLine()) != null) {
                int split = line.indexOf('\t');
                int key = Integer.parseInt(line.substring(0, split));
                int context_key = key - initIndex;
                if (key >= initIndex && key < initIndex + capacity) {
                    int linkKey = Integer.parseInt(line.substring(split + 1));
                    if (sentenceMap[context_key] == null)
                        sentenceMap[context_key] = new Sentence(key);
                    sentenceMap[context_key].addLink(linkKey);
                }
            }
            reader.close();

            System.out.println("Reading sentences.csv...");
            FileInputStream file = new FileInputStream(sentences_filepath);
            reader = new BufferedReader(new InputStreamReader(file, StandardCharsets.UTF_8));
            while ((line = reader.readLine()) != null) {
                String[] splitArr = line.split("\t");
                int key = Integer.parseInt(splitArr[0]);
                int context_key = key - initIndex;
                if (key >= initIndex && key < initIndex + capacity) {
                    if (sentenceMap[context_key] == null)
                        sentenceMap[context_key] = new Sentence(key);
                    sentenceMap[context_key].lang = splitArr[1];
                    sentenceMap[context_key].content = splitArr[2];
                }
            }
            file.close();
            reader.close();

            System.out.println("Writing output...");
            writer = new FileWriter(output_filepath);
            writer.write("[\n");
            int count = 0;
            boolean typeComma = false;
            for (Sentence s : sentenceMap) {
                if (s != null) {
                    if (typeComma)
                        writer.write(",\n");
                    writer.write("  ");
                    s.toJSONObject().write(writer, 2, 2);
                    count++;
                    typeComma = true;
                }
            }
            writer.write("\n]\n");
            writer.close();
            System.out.println("DONE");
            return count;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return -1;
    }
}
