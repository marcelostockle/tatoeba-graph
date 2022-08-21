package lsm.tatoeba;

public class Main {
    public static void main(String[] args) {
        int capacity = Integer.parseInt(args[0]);
        int initIndex = 1;
        int returnCount = 1;
        int iterations = 0;
        while (returnCount > 0) {
            iterations++;
            System.out.printf("Iteration #%d. Initial index: %d.\n", iterations, initIndex);
            String output_filepath = String.format("./data/jsonOutput.%02d.json", iterations);
            returnCount = Application.run(capacity, initIndex, output_filepath);
            initIndex += capacity;
            System.out.printf("%d new sentences.\n", returnCount);
            System.out.printf("Saved results to %s.\n", output_filepath);
        }
    }
}
