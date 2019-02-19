package guitarproject;

public class ClosedTriad {
	private Key myKey;
	private Note[] notes = new Note[3];
	private Note root;
	private int inversion;
	private boolean isInKey;
	private String name="";
	
	public ClosedTriad(Key myKey, Note root, int inversion) {
		isInKey=false;
		this.root=root;
		this.myKey=myKey;
		this.inversion=inversion;
	}

	
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}



	/**
	 * Determine the name of the chord from the key of the root
	 */
	private void setName() {
		//MAKE SURE NOT TO GET ACCIDENTAL RECURSION HERE
		//DO NOT JUST MAKE A NEW TRIAD AND COMPARE TO CURRENT TRIAD
		//UNLESS ??? MAYBEDON"T PUT SET NAME IN THE CONSTRUCTOR?
		//SIMILAR PROBLEM TO SETINVERSION
		
		//major, minor, diminished, augmented
		//this.name = name;
	}



	/**
	 * @return the myKey
	 */
	public Key getMyKey() {
		return myKey;
	}

	/**
	 * @param myKey the myKey to set
	 */
	public void setMyKey(Key myKey) {
		this.myKey = myKey;
	}

	/**
	 * @return the inversion
	 */
	public int getInversion() {
		return inversion;
	}

	/**
	 * @param inversion the inversion to set
	 */
	public void setInversion(int inversion) {
		this.inversion = inversion;
		int rootPosition=0;
		for(int i=0;i<myKey.getNotes().length;i++) {
			if(root.equals(myKey.getNotes()[i])){
				isInKey=true;
				rootPosition=i;
			}
		}
		if(isInKey) {
			if(inversion==0) {
				notes[0]=root;
				notes[1]=myKey.getNotes()[(rootPosition+2)%7];
				notes[2]=myKey.getNotes()[(rootPosition+4)%7];
				
				//System.out.println(notes[0]+" "+notes[1]+" "+notes[2]);
			}
			if(inversion==1) {
				notes[2]=root;
				notes[0]=myKey.getNotes()[(rootPosition+2)%7];
				notes[1]=myKey.getNotes()[(rootPosition+4)%7];
				
				//System.out.println(notes[0]+" "+notes[1]+" "+notes[2]);
			}
			if(inversion==2) {
				notes[1]=root;
				notes[2]=myKey.getNotes()[(rootPosition+2)%7];
				notes[0]=myKey.getNotes()[(rootPosition+4)%7];
				
				//System.out.println(notes[0]+" "+notes[1]+" "+notes[2]);
			}
		}
	}

	/**
	 * @return the notes
	 */
	public Note[] getNotes() {
		return notes;
	}
}
