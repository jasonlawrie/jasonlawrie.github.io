package guitarproject;

public class PrintMusic {

	private static String[] tabLine = {"|-----","|-----","|-----","|-----","|-----","|-----"};
	public PrintMusic() {}
	
	public static void tab(Fret[] frets) {
		for(Fret fret:frets) {
			tabLine[fret.getStrNum()-1]="|--"+fret.getFretNum()+"--";
			
		}
		for(String line:tabLine) {
			System.out.println(line);
		}
	}
	public static void chordGrid(Fret[] frets) {
		
	}
	public static void staff(Note[] notes) {
		
	}
}
